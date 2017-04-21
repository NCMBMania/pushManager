var gulp       = require('gulp')
var browserify = require('browserify')
var source     = require('vinyl-source-stream')
var vueify = require('vueify')

gulp.task('build', function() { // build というタスクを定義します
  browserify('./src/app.js') // browserify の設定をして・・・
  .transform(vueify)
  .bundle() // 一つのファイルにまとめたものを 
  .pipe(source('bundle.js')) // bundle.js という名前のファイルに記録して
  .pipe(gulp.dest('./assets/')) // "./" に書き出します
})

gulp.task('default', ['build']) // デフォルトの gulp タスクは build です。
