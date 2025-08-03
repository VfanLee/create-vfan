import { showHelp, showVersion, parseArgs } from './cli.js'
import { promptProjectInfo } from './prompts.js'
import { createProject } from './creator.js'

async function main() {
  const args = process.argv.slice(2)
  const { hasHelp, hasVersion, projectName } = parseArgs(args)

  if (hasHelp) {
    showHelp()
    return
  }

  if (hasVersion) {
    showVersion()
    return
  }

  try {
    const { projectName: finalProjectName, template } = await promptProjectInfo(projectName)

    await createProject(finalProjectName, template)
  } catch (error) {
    console.error('❌ 创建项目失败:', error)
    process.exit(1)
  }
}

main()
