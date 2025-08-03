import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const TEMPLATE_CONFIG = {
  root: path.resolve(__dirname, '..', 'templates'),
  choices: [
    { title: 'React18 + TypeScript', value: 'react18-ts' },
    { title: 'React Admin Template - alpha', value: 'react-admin-remote' },
    { title: 'Next.js 14', value: 'next14' },
    { title: 'Vue3 + TypeScript', value: 'vue3-ts' },
    { title: 'Vue2 + JavaScript', value: 'vue2-js' },
    { title: 'Vue Admin Template - alpha', value: 'vue-admin-remote' },
  ],
}

export const REMOTE_TEMPLATES = {
  'vue-admin-remote': {
    repo: 'https://github.com/VfanLee/vue-admin-template.git',
    name: 'vue-admin-template',
  },
  'react-admin-remote': {
    repo: 'https://github.com/VfanLee/react-admin-template.git',
    name: 'react-admin-template',
  },
}

export function getTemplateDir(template: string): string {
  return path.join(TEMPLATE_CONFIG.root, template)
}

export function getTargetDir(projectName: string): string {
  return path.resolve(process.cwd(), projectName)
}
