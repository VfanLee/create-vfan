import path from 'path'

// 远程模板配置：所有模板都从 GitHub 仓库获取
export const REMOTE_TEMPLATES = {
  // React 模板
  'react18-ts': {
    repo: 'https://github.com/VfanLee/create-vfan.git',
    subDir: 'templates/react18-ts',
    name: 'react18-ts',
  },
  'next14': {
    repo: 'https://github.com/VfanLee/create-vfan.git',
    subDir: 'templates/next14',
    name: 'next14',
  },
  'react-admin-remote': {
    repo: 'https://github.com/VfanLee/react-admin-template.git',
    name: 'react-admin-template',
  },

  // Vue 模板
  'vue2-js': {
    repo: 'https://github.com/VfanLee/create-vfan.git',
    subDir: 'templates/vue2-js',
    name: 'vue2-js',
  },
  'vue3-ts': {
    repo: 'https://github.com/VfanLee/create-vfan.git',
    subDir: 'templates/vue3-ts',
    name: 'vue3-ts',
  },
  'vue-admin-remote': {
    repo: 'https://github.com/VfanLee/vue-admin-template.git',
    name: 'vue-admin-template',
  },
}

// 模板配置：按框架分类的模板列表
export const TEMPLATE_CONFIG = {
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

// 获取目标项目目录路径
export function getTargetDir(projectName: string): string {
  return path.resolve(process.cwd(), projectName)
}
