import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const TEMPLATE_CONFIG = {
  root: path.resolve(__dirname, '..', 'templates'),
  choices: [
    { title: 'React18 + TS', value: 'react18-ts' },
    { title: 'Next14', value: 'next14' },
    { title: 'Vue3 + TS', value: 'vue3-ts' },
    { title: 'Vue2 + JS', value: 'vue2-js' },
  ],
}

export function getTemplateDir(template: string): string {
  return path.join(TEMPLATE_CONFIG.root, template)
}

export function getTargetDir(projectName: string): string {
  return path.resolve(process.cwd(), projectName)
}
