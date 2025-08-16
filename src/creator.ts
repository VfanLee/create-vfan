import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import { simpleGit } from 'simple-git'
import cliProgress from 'cli-progress'
import { REMOTE_TEMPLATES } from './template.js'
import { updatePackageJson, copyTemplateFiles } from './utils.js'

// 从远程 Git 仓库下载模板（支持子目录）
async function downloadRemoteTemplate(template: string, targetDir: string) {
  const remoteConfig = REMOTE_TEMPLATES[template]
  if (!remoteConfig) {
    throw new Error(`未找到远程模板配置: ${template}`)
  }

  console.log(chalk.cyan(`📦 正在创建项目...`))
  console.log()

  const progressBar = new cliProgress.SingleBar({
    format: chalk.cyan('{bar}') + ' {percentage}% | ' + chalk.gray('{stage}'),
    barCompleteChar: '█',
    barIncompleteChar: '░',
    hideCursor: true,
    barsize: 40,
    stopOnComplete: true,
  })

  const git = simpleGit({
    progress: (progress) => {
      // Git 进度回调，显示真实的下载进度
      const { method, stage, progress: percent } = progress

      if (method === 'clone' || method === 'checkout') {
        const percentage = Math.round(percent)
        let stageText = '下载中...'

        if (stage.includes('Counting objects')) {
          stageText = '正在计算对象...'
        } else if (stage.includes('Compressing objects')) {
          stageText = '正在压缩对象...'
        } else if (stage.includes('Receiving objects')) {
          stageText = '正在接收对象...'
        } else if (stage.includes('Resolving deltas')) {
          stageText = '正在解析增量...'
        }

        if (percent === 100) {
          progressBar.update(100, { stage: '完成!' })
        }

        progressBar.update(percentage, { stage: stageText })
      }
    },
  })

  const tempDir = path.join(process.cwd(), `temp-${Date.now()}`)

  try {
    progressBar.start(100, 0, { stage: '初始化...' })

    // 使用浅克隆(--depth=1)只下载最新代码，忽略Git历史以加速下载
    await git.clone(remoteConfig.repo, tempDir, ['--depth', '1', '--progress'])

    progressBar.update(90, { stage: '下载完成，正在处理...' })

    // 确定源目录路径
    const sourceDir = remoteConfig.subDir ? path.join(tempDir, remoteConfig.subDir) : tempDir

    // 检查源目录是否存在
    if (!(await fs.pathExists(sourceDir))) {
      throw new Error(`模板目录不存在: ${remoteConfig.subDir || '根目录'}`)
    }

    progressBar.update(95, { stage: '复制模板文件...' })

    // 复制模板文件到目标目录
    await fs.ensureDir(targetDir)
    await copyTemplateFiles(sourceDir, targetDir)

    progressBar.update(100, { stage: '完成!' })
  } catch (error) {
    progressBar.stop()
    throw new Error(`创建项目失败: ${error instanceof Error ? error.message : String(error)}`)
  } finally {
    // 清理临时目录
    if (await fs.pathExists(tempDir)) {
      await fs.remove(tempDir)
    }
  }
}

// 主要的项目创建流程
export async function createProject(projectName: string, template: string, force: boolean = false) {
  const targetDir = path.resolve(process.cwd(), projectName)

  // 检查目标目录是否已存在
  if (await fs.pathExists(targetDir)) {
    if (!force) {
      console.error(chalk.red(`❌ 目录 '${projectName}' 已存在！`))
      console.error(chalk.yellow('💡 使用 --force 参数强制覆盖'))
      process.exit(1)
    }

    console.log(chalk.yellow(`⚠️ 正在覆盖已存在的目录: ${projectName}`))
    await fs.remove(targetDir)
  }

  console.log(chalk.cyan(`📋 使用模板: ${template}`))

  try {
    // 检查模板是否存在
    if (!REMOTE_TEMPLATES[template]) {
      throw new Error(`模板 '${template}' 不存在`)
    }

    // 从远程下载模板
    await downloadRemoteTemplate(template, targetDir)

    // 更新 package.json 中的项目名称
    await updatePackageJson(targetDir, projectName)
  } catch (error) {
    // 创建失败时清理已创建的目录
    if (await fs.pathExists(targetDir)) {
      await fs.remove(targetDir)
    }
    throw error
  }
}
