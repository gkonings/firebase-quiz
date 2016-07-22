// reference: https://gist.github.com/dshafik/07dc3985b5f4888865ea

var gulp = require('gulp');
$ = require('gulp-load-plugins')(); // Note the extra parens

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
});


gulp.task('clean', function () {
    var generated = ['public/js/vendor.js', 'public/css/vendor.css', 'public/index.html'];
    return gulp.src(generated)
        .pipe($.rimraf());
});

gulp.task('watch', ['default'], function() {
    var watchFiles = [
        'app/css/**/*.css',
        'app/js/**/*.js'
    ];

    gulp.watch(watchFiles, ['copy']);
});