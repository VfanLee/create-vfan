import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 模板配置：包含本地模板目录和按框架分类的模板列表
export const TEMPLATE_CONFIG = {
  root: path.resolve(__dirname, '..', 'templates'),
  frameworks: [
    { title: 'React', value: 'react' },
    { title: 'Vue', value: 'vue' },
  ],
  react: [
    { title: 'React18 + TypeScript', value: 'react18-ts' },
    { title: 'React Admin Template(alpha)', value: 'react-admin-remote' },
    { title: 'Next.js 14', value: 'next14' },
  ],
  vue: {
    versions: [
      { title: 'Vue2', value: 'vue2' },
      { title: 'Vue3', value: 'vue3' },
    ],
    vue2: [{ title: 'Vue2 + JavaScript', value: 'vue2-js' }],
    vue3: [
      { title: 'Vue3 + TypeScript', value: 'vue3-ts' },
      { title: 'Vue Admin Template(alpha)', value: 'vue-admin-remote' },
    ],
  },
}

// 远程模板配置：通过 Git 仓库获取的模板
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

// 获取本地模板目录路径
export function getTemplateDir(template: string): string {
  return path.join(TEMPLATE_CONFIG.root, template)
}

// 获取目标项目目录路径
export function getTargetDir(projectName: string): string {
  return path.resolve(process.cwd(), projectName)
}
