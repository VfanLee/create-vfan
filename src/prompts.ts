import inquirer from 'inquirer'
import chalk from 'chalk'
import { TEMPLATE_CONFIG } from './template.js'

export async function promptProjectInfo(projectName?: string) {
  const questions = []

  // 如果没有提供项目名称，则询问
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

  // 模板选择
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
        highlight: chalk.magenta, // 自定义高亮颜色为紫色
        answer: chalk.blue, // 自定义答案颜色为蓝色
      },
    },
  })

  const answers = await inquirer.prompt(questions)

  return {
    projectName: projectName || answers.projectName,
    template: answers.template,
  }
}
