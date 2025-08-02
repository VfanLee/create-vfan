const { src } = require('gulp')

const webserver = require('gulp-webserver')

module.exports.server = function () {
  src('./src').pipe(
    webserver({
      host: 'localhost',
      port: '8080',
      livereload: false,
      open: true,
    }),
  )
}
