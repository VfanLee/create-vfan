#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import { promptProjectInfo } from './prompts.js'
import { createProject } from './creator.js'
import { parseArguments, getPackageVersion } from './utils.js'

const program = new Command()

// 配置 CLI 命令行接口
program
  .name('create-vfan')
  .description('Vfan Lee 的项目脚手架，用于快速创建项目。')
  .usage('[项目名称] [选项]')
  .version(getPackageVersion(), '-v, --version', '显示版本信息')
  .argument('[project-name]', '项目名称')
  .option('-f, --force', '强制覆盖已存在的目录')
  .option('-t, --template <template>', '指定模板')
  .configureOutput({
    writeOut: (str) => {
      const chineseStr = str
        .replace(/Usage:/g, '用法（Usage）:')
        .replace(/Arguments:/g, '参数（Arguments）:')
        .replace(/Options:/g, '选项（Options）:')
        .replace(/display help for command/g, '显示帮助信息')
      process.stdout.write(chineseStr)
    },
    writeErr: (str) => process.stderr.write(str),
  })
  .addHelpText(
    'after',
    `
示例（Examples）:
  ${chalk.dim('$')} create-vfan
  ${chalk.dim('$')} create-vfan my-app
  ${chalk.dim('$')} create-vfan my-app --template react
  ${chalk.dim('$')} create-vfan my-app -t nextjs --force
`,
  )
  .action(async (projectNameArg, options) => {
    console.log(chalk.bold(chalk.cyan('create-vfan')) + ' 🚀\n')

    try {
      // 解析参数 - 目前只需要一个项目名称参数
      const args = parseArguments(projectNameArg, 1)
      const projectName = args[0]

      // 通过交互式提示获取项目信息
      const { projectName: finalProjectName, template } = await promptProjectInfo(projectName, options.template)
      console.log()

      // 执行项目创建流程
      await createProject(finalProjectName, template!, options.force)

      console.log(chalk.cyan(`\n✨ ${finalProjectName} 创建完成！`))
    } catch (error) {
      console.error(chalk.red('\n❌ 创建项目失败: ') + error)
      process.exit(1)
    }
  })

program.parse()
