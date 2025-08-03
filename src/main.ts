#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { promptProjectInfo } from './prompts.js'
import { createProject } from './creator.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function getVersion() {
  const packagePath = path.resolve(__dirname, '..', 'package.json')
  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
    return pkg.version
  } catch (error) {
    return '0.1.0'
  }
}

const program = new Command()

program
  .name('create-vfan')
  .description("Vfan Lee's Projects CLI - 快速创建项目模板")
  .version(getVersion(), '-v, --version', '显示版本信息')
  .argument('[project-name]', '项目名称')
  .option('--override', '强制覆盖已存在的目录')
  .addHelpText(
    'after',
    `
${chalk.cyan('示例:')}
  ${chalk.dim('$')} create-vfan                ${chalk.gray('交互式创建项目')}
  ${chalk.dim('$')} create-vfan my-app         ${chalk.gray('直接指定项目名称创建')}
  ${chalk.dim('$')} create-vfan my-app --override  ${chalk.gray('强制覆盖已存在的目录')}

${chalk.cyan('支持的模板:')}
  ${chalk.green('•')} React18 + TypeScript
  ${chalk.green('•')} Next.js 14
  ${chalk.green('•')} Vue3 + TypeScript
  ${chalk.green('•')} Vue2 + JavaScript
`,
  )
  .action(async (projectName, options) => {
    console.log(chalk.bold(chalk.green('create-vfan')) + ' 🚀\n')

    try {
      const { projectName: finalProjectName, template } = await promptProjectInfo(projectName)
      await createProject(finalProjectName, template, options.override)

      console.log(chalk.green(`\n✨ ${finalProjectName} 创建完成！`))
    } catch (error) {
      console.error(chalk.red('\n❌ 创建项目失败: ') + error)
      process.exit(1)
    }
  })

// 解析命令行参数
program.parse()
