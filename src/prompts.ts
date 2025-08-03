import prompts from 'prompts'
import { TEMPLATE_CONFIG } from './template.js'

export async function promptProjectInfo(projectName?: string) {
  const questions = []

  if (!projectName) {
    questions.push({
      type: 'text',
      name: 'projectName',
      message: '项目名称：',
      initial: 'my-app',
    })
  }

  questions.push({
    type: 'select',
    name: 'template',
    message: '模板选择：',
    choices: TEMPLATE_CONFIG.choices,
  })

  const response = await prompts(questions)

  return {
    projectName: projectName || response.projectName,
    template: response.template,
  }
}
