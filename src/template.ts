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
  'vue-viz-remote': {
    repo: 'https://github.com/VfanLee/vue-viz-template.git',
    name: 'vue-viz-template',
  },
}

// 模板配置：按框架分类的模板列表
export const TEMPLATE_CONFIG = {
  frameworks: [
    { title: 'React', value: 'react' },
    { title: 'Vue', value: 'vue' },
  ],
  react: [
    { title: 'React18', value: 'react18-ts' },
    { title: 'React Admin Template', value: 'react-admin-remote' },
    { title: 'Next.js 14', value: 'next14' },
  ],
  vue: {
    versions: [
      { title: 'Vue2', value: 'vue2' },
      { title: 'Vue3', value: 'vue3' },
    ],
    vue2: [{ title: 'Vue2', value: 'vue2-js' }],
    vue3: [
      { title: 'Vue3', value: 'vue3-ts' },
      { title: 'Vue Admin Template', value: 'vue-admin-remote' },
      { title: 'Vue Viz Template', value: 'vue-viz-remote' },
    ],
  },
}
