import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import { simpleGit } from 'simple-git'
import cliProgress from 'cli-progress'
import { getTemplateDir, getTargetDir, REMOTE_TEMPLATES } from './template.js'

async function copyTemplateWithProgress(templateDir: string, targetDir: string) {
  console.log(chalk.cyan('📦 正在创建项目...'))
  console.log()

  const files: string[] = []
  const collectFiles = async (dir: string) => {
    const items = await fs.readdir(dir)
    for (const item of items) {
      const itemPath = path.join(dir, item)
      const stat = await fs.stat(itemPath)
      if (stat.isDirectory()) {
        if (!item.includes('node_modules')) {
          await collectFiles(itemPath)
        }
      } else {
        const relativePath = path.relative(templateDir, itemPath)
        if (!relativePath.includes('node_modules')) {
          files.push(itemPath)
        }
      }
    }
  }

  await collectFiles(templateDir)

  const progressBar = new cliProgress.SingleBar({
    format: chalk.cyan('{bar}') + ' {percentage}% | {value}/{total} | ' + chalk.gray('{filename}'),
    barCompleteChar: '█',
    barIncompleteChar: '░',
    hideCursor: true,
    barsize: 30,
  })

  progressBar.start(files.length, 0, { filename: '准备中...' })

  try {
    for (let i = 0; i < files.length; i++) {
      const filePath = files[i]
      const relativePath = path.relative(templateDir, filePath)
      const targetFilePath = path.join(targetDir, relativePath)

      await fs.ensureDir(path.dirname(targetFilePath))
      await fs.copy(filePath, targetFilePath)

      progressBar.update(i + 1, { filename: relativePath })

      if (files.length < 50) {
        await new Promise((resolve) => setTimeout(resolve, 20))
      }
    }

    progressBar.stop()
  } catch (error) {
    progressBar.stop()
    throw error
  }
}

async function downloadRemoteTemplate(template: string, targetDir: string) {
  const remoteConfig = REMOTE_TEMPLATES[template]
  if (!remoteConfig) {
    throw new Error(`未找到远程模板配置: ${template}`)
  }

  console.log(chalk.cyan(`📦 正在创建项目...`))
  console.log()

  const progressBar = new cliProgress.SingleBar({
    format: chalk.cyan('{bar}') + ' {percentage}% | {value}/{total} | ' + chalk.gray('{stage}'),
    barCompleteChar: '█',
    barIncompleteChar: '░',
    hideCursor: true,
    barsize: 30,
  })

  const git = simpleGit()
  try {
    progressBar.start(100, 0, { stage: '初始化...' })

    progressBar.update(10, { stage: '连接到远程仓库...' })

    await new Promise((resolve) => setTimeout(resolve, 500))
    progressBar.update(30, { stage: '开始下载...' })

    await git.clone(remoteConfig.repo, targetDir, ['--depth', '1'])
    progressBar.update(80, { stage: '下载完成，正在处理...' })

    const gitDir = path.join(targetDir, '.git')
    if (await fs.pathExists(gitDir)) {
      await fs.remove(gitDir)
    }

    progressBar.update(100, { stage: '完成!' })
    progressBar.stop()
  } catch (error) {
    progressBar.stop()
    throw new Error(`创建项目失败: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function createProject(projectName: string, template: string, force: boolean = false) {
  const targetDir = getTargetDir(projectName)

  if (await fs.pathExists(targetDir)) {
    if (!force) {
      console.error(chalk.red(`❌ 目录 '${projectName}' 已存在！`))
      console.error(chalk.yellow('💡 使用 --force 参数强制覆盖'))
      process.exit(1)
    }

    console.log(chalk.yellow(`⚠️  正在覆盖已存在的目录: ${projectName}`))
    await fs.remove(targetDir)
  }

  console.log(chalk.cyan(`📋 使用模板: ${template}`))

  try {
    if (REMOTE_TEMPLATES[template]) {
      await downloadRemoteTemplate(template, targetDir)
    } else {
      const templateDir = getTemplateDir(template)

      if (!(await fs.pathExists(templateDir))) {
        throw new Error(`模板 '${template}' 不存在`)
      }

      await copyTemplateWithProgress(templateDir, targetDir)
    }

    await updatePackageJson(targetDir, projectName)
  } catch (error) {
    if (await fs.pathExists(targetDir)) {
      await fs.remove(targetDir)
    }
    throw error
  }
}

async function updatePackageJson(targetDir: string, projectName: string) {
  const pkgPath = path.join(targetDir, 'package.json')

  if (!fs.existsSync(pkgPath)) {
    return
  }

  try {
    const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf-8'))
    pkg.name = projectName
    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2))
  } catch (error) {
    console.warn(chalk.yellow('⚠️ 更新 package.json 失败:'), error)
  }
}
