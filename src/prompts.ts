import inquirer from 'inquirer'
import chalk from 'chalk'
import { TEMPLATE_CONFIG } from './template.js'

export async function promptProjectInfo(projectName?: string, template?: string) {
  const questions = []

  if (!projectName) {
    questions.push({
      type: 'input',
      name: 'projectName',
      message: '项目名称:',
      default: 'my-app',
      validate: (input: string) => {
        if (!input.trim()) {
          return '项目名称不能为空'
        }
        if (!/^[a-zA-Z0-9\-_]+$/.test(input)) {
          return '项目名称只能包含字母、数字、连字符和下划线'
        }
        return true
      },
    })
  }

  if (!template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: '选择模板:',
      choices: TEMPLATE_CONFIG.choices.map((choice) => ({
        name: chalk.cyan(choice.title),
        value: choice.value,
        short: choice.title,
      })),
      theme: {
        style: {
          highlight: chalk.cyan,
          answer: chalk.cyan,
        },
      },
    })
  } else {
    const validTemplates = TEMPLATE_CONFIG.choices.map((choice) => choice.value)
    if (!validTemplates.includes(template)) {
      console.error(chalk.red(`❌ 无效的模板: ${template}`))
      console.error(chalk.yellow(`💡 可用模板: ${validTemplates.join(', ')}`))
      process.exit(1)
    }
  }

  const answers = await inquirer.prompt(questions)

  return {
    projectName: projectName || answers.projectName,
    template: template || answers.template,
  }
}
