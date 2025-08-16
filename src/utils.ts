import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * 参数处理工具函数
 * @param args 用户输入的参数，可能是字符串、字符串数组或undefined
 * @param expectedCount 期望的参数数量，默认为1
 * @returns 处理后的参数数组
 */
export function parseArguments(args: string | string[] | undefined, expectedCount: number = 1): string[] {
  if (!args) return []

  const argsArray = Array.isArray(args) ? args : [args]

  if (argsArray.length > expectedCount) {
    console.error(chalk.red(`❌ 参数过多，期望 ${expectedCount} 个，实际收到 ${argsArray.length} 个`))
    console.error(chalk.yellow(`💡 您输入了: ${argsArray.join(', ')}`))

    if (expectedCount === 1) {
      console.error(chalk.yellow('💡 请只提供一个项目名称，例如: create-vfan my-app'))
    }

    process.exit(1)
  }

  return argsArray
}

/**
 * 获取当前项目 package.json 中的版本号
 * @returns 版本号字符串
 */
export function getPackageVersion(): string {
  try {
    // 从当前模块所在目录开始向上查找 package.json
    let dir = path.dirname(fileURLToPath(import.meta.url))

    while (dir !== path.dirname(dir)) {
      const pkgPath = path.join(dir, 'package.json')
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
        return pkg.version
      }
      dir = path.dirname(dir)
    }

    // 如果找不到，尝试默认路径
    const defaultPath = path.resolve(dir, '..', 'package.json')
    const pkg = JSON.parse(fs.readFileSync(defaultPath, 'utf-8'))
    return pkg.version
  } catch (error) {
    return '0.0.0'
  }
}

/**
 * 更新 package.json 文件中的项目名称
 * @param targetDir 目标目录路径
 * @param projectName 新的项目名称
 */
export async function updatePackageJson(targetDir: string, projectName: string): Promise<void> {
  const pkgPath = path.join(targetDir, 'package.json')

  if (!fs.existsSync(pkgPath)) {
    return
  }

  try {
    const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf-8'))
    pkg.name = projectName
    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2))
  } catch (error) {
    console.warn(chalk.yellow('⚠️ 更新 package.json 失败:'), error)
  }
}

/**
 * 递归复制模板文件（跳过 .git 和 node_modules）
 * @param sourceDir 源目录
 * @param targetDir 目标目录
 */
export async function copyTemplateFiles(sourceDir: string, targetDir: string): Promise<void> {
  const items = await fs.readdir(sourceDir)

  for (const item of items) {
    // 跳过 .git 目录和 node_modules
    if (item === '.git' || item.includes('node_modules')) continue

    const sourcePath = path.join(sourceDir, item)
    const targetPath = path.join(targetDir, item)

    const stat = await fs.stat(sourcePath)

    if (stat.isDirectory()) {
      // 递归复制目录
      await fs.ensureDir(targetPath)
      await copyTemplateFiles(sourcePath, targetPath)
    } else {
      // 复制文件
      await fs.copy(sourcePath, targetPath)
    }
  }
}
