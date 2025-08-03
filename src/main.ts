import prompts from 'prompts'
import path from 'path'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const TEMPLATE_ROOT = path.resolve(__dirname, '..', 'templates')

async function main() {
  const args = process.argv.slice(2)
  const projectNameFromArgs = args[0]

  const questions = []

  if (!projectNameFromArgs) {
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
    choices: [
      { title: 'React18 + TS', value: 'react18-ts' },
      { title: 'Next14', value: 'next14' },
      { title: 'Vue3 + TS', value: 'vue3-ts' },
      { title: 'Vue2 + JS', value: 'vue2-js' },
    ],
  })

  const response = await prompts(questions)

  const projectName = projectNameFromArgs || response.projectName
  const targetDir = path.resolve(process.cwd(), projectName)
  const templateDir = path.join(TEMPLATE_ROOT, response.template)

  await fs.copy(templateDir, targetDir)

  const pkgPath = path.join(targetDir, 'package.json')
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf-8'))
    pkg.name = projectName
    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2))
  }

  console.log(`🎉 ${projectName} 创建成功 🎉`)
}

main()
