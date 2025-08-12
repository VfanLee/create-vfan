import { build, context } from 'esbuild'
import fs from 'fs-extra'

const isWatch = process.argv.includes('--watch')

await fs.emptyDir('dist')

const options = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  format: 'esm',
  target: 'node20',
  minify: !isWatch,
  sourcemap: isWatch,
  external: ['fs-extra', 'commander', 'inquirer', 'chalk', 'simple-git', 'cli-progress'],
}

try {
  if (isWatch) {
    const ctx = await context({
      ...options,
      plugins: [
        {
          name: 'watch-plugin',
          setup(build) {
            build.onEnd((result) => {
              if (result.errors.length === 0) {
                console.log('✅ 构建完成！正在监听变化...')
              }
            })
          },
        },
      ],
    })
    await ctx.watch()
    console.log('👀 正在监听变化...')
  } else {
    await build(options)
    console.log('✅ 构建成功！')
  }
} catch (error) {
  console.error('❌ 构建失败:', error)
  process.exit(1)
}
