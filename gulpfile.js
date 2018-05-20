'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');

gulp.task('less', () => {
  const LessAutoPrefix = require('less-plugin-autoprefix');
  const autoPrefix = new LessAutoPrefix({ browsers: ['last 2 versions'] });
  return gulp
    .src('./src/public/styles/less/**/*.less')
    .pipe(
      less({
        paths: [path.join(__dirname, 'less', 'includes')],
        plugins: [autoPrefix]
      })
    )
    .pipe(gulp.dest('./src/public/styles/css'));
});

gulp.task('watch', () =>
  gulp.watch('./src/public/styles/less/**/*.less', ['less'])
);
