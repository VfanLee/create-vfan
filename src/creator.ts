import path from 'path'
import fs from 'fs-extra'
import { getTemplateDir, getTargetDir } from './template.js'

export async function createProject(projectName: string, template: string) {
  const targetDir = getTargetDir(projectName)
  const templateDir = getTemplateDir(template)

  await fs.copy(templateDir, targetDir)

  await updatePackageJson(targetDir, projectName)

  console.log(`🎉 ${projectName} 创建成功 🎉`)
}

async function updatePackageJson(targetDir: string, projectName: string) {
  const pkgPath = path.join(targetDir, 'package.json')

  if (!fs.existsSync(pkgPath)) {
    return
  }

  try {
    const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf-8'))
    pkg.name = projectName
    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2))
  } catch (error) {
    console.warn('⚠️ 更新 package.json 失败:', error)
  }
}
