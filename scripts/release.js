import { execSync } from 'child_process'

const version = process.argv[2]
const tags = ['alpha', 'beta', 'rc', 'next']

function main() {
  if (!version) {
    console.error('❌ Please provide a version')
    process.exit(1)
  }

  console.log(`Creating GitHub release for version: ${version}`)

  try {
    const isPrerelease = tags.some((tag) => version.includes(`-${tag}`))

    const baseCommand = `gh release create ${version} --title "${version}" --notes "For complete changelog, see [CHANGELOG.md](https://github.com/VfanLee/create-vfan/blob/main/CHANGELOG.md)."`

    const command = isPrerelease ? `${baseCommand} --prerelease` : baseCommand

    const releaseType = isPrerelease ? 'prerelease' : 'stable'
    console.log(`Creating ${releaseType} GitHub release...`)

    execSync(command, { stdio: 'inherit' })
    console.log(`✅ Successfully created ${releaseType} release: ${version}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(`❌ Error while creating GitHub release: ${errorMessage}`)
    process.exit(1)
  }
}

main()
