// based on: https://gist.github.com/dshafik/07dc3985b5f4888865ea

var gulp = require('gulp');
var del = require('del');
$ = require('gulp-load-plugins')();

gulp.task('default', ['minify', 'fix-paths', 'copy']);

gulp.task('minify', ['clean'], function () {
    return gulp.src('app/index.html')
        .pipe($.usemin({
            assetsDir: 'public',
            css: [$.minifyCss(), 'concat'],
            js: [$.uglify(), 'concat']
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('fix-paths', ['minify'], function () {
    gulp.src('public/css/vendor.css')
        .pipe($.replace('../', '../bower_components/bootstrap/dist/'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('copy', ['clean'], function () {

    gulp.src(['js/**/*.js'], { cwd: 'app' })
        .pipe(gulp.dest('public/js'));

    gulp.src(['css/**/*.css'], { cwd: 'app' })
        .pipe(gulp.dest('public/css'));

    gulp.src(['img/**/*.png', 'img/**/*.jpg'], { cwd: 'app' })
        .pipe(gulp.dest('public/img'));

    gulp.src(['views/**/*.html',], { cwd: 'app' })
        .pipe(gulp.dest('public/views'));
});


gulp.task('clean', function () {
    return del([
    'public/**/*'
  ]);
});

gulp.task('watch', ['default'], function () {
    var watchFiles = [
        'app/**/*'
    ];

    gulp.watch(watchFiles, ['default']);
});