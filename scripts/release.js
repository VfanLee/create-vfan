import { execSync } from 'child_process'

const version = process.argv[2]
const tags = ['alpha', 'beta', 'rc', 'next']

function main() {
  if (!version) {
    console.error('❌ 版本号不能为空！请提供版本号作为参数。')
    process.exit(1)
  }

  console.log(`正在为版本创建 GitHub Release: ${version}`)

  try {
    const isPrerelease = tags.some((tag) => version.includes(`-${tag}`))

    const baseCommand = `gh release create ${version} --title "${version}" --notes "For complete changelog, see [CHANGELOG.md](https://github.com/VfanLee/create-vfan/blob/main/CHANGELOG.md)."`

    const command = isPrerelease ? `${baseCommand} --prerelease` : baseCommand

    const releaseType = isPrerelease ? 'prerelease' : 'stable'
    console.log(`正在创建 ${releaseType} GitHub Release...`)

    execSync(command, { stdio: 'inherit' })
    console.log(`✅ 创建 GitHub ${releaseType} Release 成功: ${version}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '未知错误'
    console.error(`❌ 创建 GitHub Release 时出错: ${errorMessage}`)
    process.exit(1)
  }
}

main()
