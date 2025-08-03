import { build, context, type BuildOptions } from 'esbuild'
import fs from 'fs-extra'

const isWatch = process.argv.includes('--watch')

await fs.emptyDir('dist')

const options: BuildOptions = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  format: 'esm',
  target: 'node20',
  minify: !isWatch,
  sourcemap: isWatch,
  external: ['fs-extra', 'prompts'],
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
                console.log('✅ Build completed! Watching for changes...')
              }
            })
          },
        },
      ],
    })
    await ctx.watch()
    console.log('👀 Watching for changes... (Press Ctrl+C to stop)')
  } else {
    await build(options)
    console.log('✅ Build completed successfully!')
  }
} catch (error) {
  console.error('❌ Build failed:', error)
  process.exit(1)
}
