#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { promptProjectInfo } from './prompts.js'
import { createProject } from './creator.js'
import { TEMPLATE_CONFIG } from './template.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 获取 package.json 中的版本号
function getVersion() {
  const packagePath = path.resolve(__dirname, '..', 'package.json')
  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
    return pkg.version
  } catch (error) {
    return '0.0.0'
  }
}

const program = new Command()

// 配置 CLI 命令行接口
program
  .name('create-vfan')
  .description('Vfan Lee 的项目脚手架')
  .usage('[项目名称] [选项]')
  .version(getVersion(), '-v, --version', '显示版本信息')
  .argument('[project-name]', '项目名称')
  .option('-f, --force', '强制覆盖已存在的目录')
  .option('-t, --template <template>', '指定模板')
  .configureOutput({
    // 自定义输出内容的中文化
    writeOut: (str) => {
      const chineseStr = str
        .replace(/Usage:/g, '用法:')
        .replace(/Arguments:/g, '参数:')
        .replace(/Options:/g, '选项:')
        .replace(/display help for command/g, '显示帮助信息')
      process.stdout.write(chineseStr)
    },
    writeErr: (str) => process.stderr.write(str),
  })
  .addHelpText(
    'after',
    `
示例:
  ${chalk.dim('$')} create-vfan
  ${chalk.dim('$')} create-vfan my-app
  ${chalk.dim('$')} create-vfan my-app --template react18-ts
  ${chalk.dim('$')} create-vfan my-app -t next14 --force

支持的模板:
React:
${TEMPLATE_CONFIG.react.map((choice) => `  ${chalk.cyan('•')} ${choice.title}`).join('\n')}
Vue:
${[...TEMPLATE_CONFIG.vue.vue2, ...TEMPLATE_CONFIG.vue.vue3].map((choice) => `  ${chalk.cyan('•')} ${choice.title}`).join('\n')}
`,
  )
  .action(async (projectName, options) => {
    console.log(chalk.bold(chalk.cyan('create-vfan')) + ' 🚀\n')

    try {
      // 通过交互式提示获取项目信息
      const { projectName: finalProjectName, template } = await promptProjectInfo(projectName, options.template)
      console.log()

      // 执行项目创建流程
      await createProject(finalProjectName, template, options.force)

      console.log(chalk.cyan(`\n✨ ${finalProjectName} 创建完成！`))
    } catch (error) {
      console.error(chalk.red('\n❌ 创建项目失败: ') + error)
      process.exit(1)
    }
  })

program.parse()
