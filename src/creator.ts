import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import { getTemplateDir, getTargetDir } from './template.js'

export async function createProject(projectName: string, template: string, override: boolean = false) {
  const targetDir = getTargetDir(projectName)
  const templateDir = getTemplateDir(template)

  if (await fs.pathExists(targetDir)) {
    if (!override) {
      console.error(chalk.red(`❌ 目录 '${projectName}' 已存在！`))
      console.error(chalk.yellow('💡 使用 --override 参数强制覆盖'))
      process.exit(1)
    }

    console.log(chalk.yellow(`⚠️  正在覆盖已存在的目录: ${projectName}`))
    await fs.remove(targetDir)
  }

  console.log(chalk.blue(`📁 正在创建项目: ${projectName}`))
  console.log(chalk.gray(`📂 使用模板: ${template}`))

  await fs.copy(templateDir, targetDir, {
    filter: (src) => {
      const relativePath = path.relative(templateDir, src)
      return !relativePath.includes('node_modules')
    },
  })

  await updatePackageJson(targetDir, projectName)

  console.log(chalk.green(`📦 项目文件已复制完成`))
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
    console.log(chalk.green(`✏️  已更新 package.json`))
  } catch (error) {
    console.warn(chalk.yellow('⚠️ 更新 package.json 失败:'), error)
  }
}
