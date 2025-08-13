import inquirer from 'inquirer'
import chalk from 'chalk'
import { TEMPLATE_CONFIG } from './template.js'

// 交互式提示用户输入项目信息
export async function promptProjectInfo(projectName?: string, template?: string) {
  const questions = []

  // 如果没有提供项目名称，提示用户输入
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
        // 项目名称只能包含字母、数字、连字符和下划线
        if (!/^[a-zA-Z0-9\-_]+$/.test(input)) {
          return '项目名称只能包含字母、数字、连字符和下划线'
        }
        return true
      },
    })
  }

  // 如果没有提供模板，让用户选择框架和模板
  if (!template) {
    // 先选择框架
    questions.push({
      type: 'list',
      name: 'framework',
      message: '选择框架:',
      choices: TEMPLATE_CONFIG.frameworks.map((framework) => ({
        name: chalk.cyan(framework.title),
        value: framework.value,
        short: framework.title,
      })),
      theme: {
        style: {
          highlight: chalk.cyan,
          answer: chalk.cyan,
        },
      },
    })
  } else {
    // 验证提供的模板是否有效
    const validTemplates = [
      ...TEMPLATE_CONFIG.react.map((choice) => choice.value),
      ...TEMPLATE_CONFIG.vue.vue2.map((choice) => choice.value),
      ...TEMPLATE_CONFIG.vue.vue3.map((choice) => choice.value),
    ]
    if (!validTemplates.includes(template)) {
      console.error(chalk.red(`❌ 无效的模板: ${template}`))
      console.error(chalk.yellow(`💡 可用模板: ${validTemplates.join(', ')}`))
      process.exit(1)
    }
  }

  const answers = await inquirer.prompt(questions)

  let selectedTemplate = template

  // 如果用户选择了框架，需要进一步选择模板
  if (!template && answers.framework) {
    if (answers.framework === 'react') {
      // React 框架直接选择模板
      const reactTemplateAnswer = await inquirer.prompt([
        {
          type: 'list',
          name: 'template',
          message: '选择 React 模板:',
          choices: TEMPLATE_CONFIG.react.map((choice) => ({
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
        },
      ])
      selectedTemplate = reactTemplateAnswer.template
    } else if (answers.framework === 'vue') {
      // Vue 框架先选择版本
      const vueVersionAnswer = await inquirer.prompt([
        {
          type: 'list',
          name: 'vueVersion',
          message: '选择 Vue 版本:',
          choices: TEMPLATE_CONFIG.vue.versions.map((version) => ({
            name: chalk.cyan(version.title),
            value: version.value,
            short: version.title,
          })),
          theme: {
            style: {
              highlight: chalk.cyan,
              answer: chalk.cyan,
            },
          },
        },
      ])

      // 根据 Vue 版本选择模板
      const vueTemplates = vueVersionAnswer.vueVersion === 'vue2' ? TEMPLATE_CONFIG.vue.vue2 : TEMPLATE_CONFIG.vue.vue3

      const vueTemplateAnswer = await inquirer.prompt([
        {
          type: 'list',
          name: 'template',
          message: `选择 ${vueVersionAnswer.vueVersion === 'vue2' ? 'Vue2' : 'Vue3'} 模板:`,
          choices: vueTemplates.map((choice) => ({
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
        },
      ])
      selectedTemplate = vueTemplateAnswer.template
    }
  }

  return {
    projectName: projectName || answers.projectName,
    template: selectedTemplate,
  }
}
