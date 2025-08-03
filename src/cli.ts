import path from 'path'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function showHelp() {
  console.log(`
create-vfan - Vfan Lee's Projects CLI

用法:
  create-vfan [项目名称] [选项]

选项:
  -h, --help     显示帮助信息
  -v, --version  显示版本信息

示例:
  create-vfan                交互式创建项目
  create-vfan my-app         直接指定项目名称创建
  create-vfan --help         显示帮助信息

支持的模板:
  • React18 + TypeScript
  • Next.js 14
  • Vue3 + TypeScript
  • Vue2 + JavaScript
`)
}

export function showVersion() {
  const packagePath = path.resolve(__dirname, '..', 'package.json')
  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
    console.log(`create-vfan v${pkg.version}`)
  } catch (error) {
    console.log('create-vfan v0.1.0')
  }
}

export function parseArgs(args: string[]) {
  const hasHelp = args.includes('--help') || args.includes('-h')
  const hasVersion = args.includes('--version') || args.includes('-v')
  const projectName = args.find((arg) => !arg.startsWith('-'))

  return {
    hasHelp,
    hasVersion,
    projectName,
  }
}
