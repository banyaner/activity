/**
 * Created by GG on 15/7/23.
 */

var pkg = require('./package.json');
var gulp = require('gulp');
var del = require('del');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var ftp = require('vinyl-ftp');
var replace = require('gulp-replace');
var gulpFilter = require('gulp-filter');

var path = {
    index: 'src/index.html',
    asset: ['src/**/*', '!src/css/**/*', '!src/js/**/*', '!src/index.html'],
    build: 'build/',
    ftpPath: 'activity/' + pkg.name
};

var ftppass = {
    test: {
        username: 'ynren1',
        password: 'ynren@163'
    },
    publish: {
        username: 'wangjun2012',
        password: 'wangjun2012'
    }
};

gulp.task('clean', function (cb) {
    return del([path.build], cb);
});

gulp.task('copy', ['clean'], function () {
    return gulp.src(path.asset)
        .pipe(gulp.dest(path.build));
});

gulp.task('usemin', ['clean'], function () {
    return gulp.src(path.index)
        .pipe(usemin({
            css: [minifyCss()],
            js: [uglify()]
        }))
        .pipe(gulp.dest(path.build));
});

gulp.task('default', ['copy', 'usemin']);

gulp.task('test', ['default'], function () {
    var conn = ftp.create({
        host: '220.181.98.57',
        port: '2100',
        user: ftppass.test.username,
        password: ftppass.test.password,
        parallel: 5
    });

    return gulp.src(path.build + '**/*')
        .pipe(conn.dest(path.ftpPath));
});

gulp.task('publish', ['default'], function () {
    var conn = ftp.create({
        host: '220.181.29.249',
        port: '16321',
        user: ftppass.publish.username,
        password: ftppass.publish.password,
        parallel: 5
    });

    var filter = gulpFilter('index.html', {restore: true});
    var version = Date.now();
    var statistics = '<script src="http://analytics.163.com/ntes.js"></script>' +
        '<script>_ntes_nacc = "mapp";neteaseTracker();</script>' +
        '<script>(function(){var c=navigator.userAgent;var b=document.referrer;var d="";if(c.match(/micromessenger/gi)){d="wx"}else{if(c.match(/weibo/gi)||b.match(/weibo\.com/gi)){d="wb"}else{if(c.match(/yixin/gi)){d="yx"}else{if(c.match(/qq/gi)||b.match(/(qq|qzone)\.com/gi)){d="qq"}}}}var e="' + pkg.name + '";var a="http://sps.163.com/special/?spst=5&spss=newsapp&spsf="+d+"&modelid="+e;neteaseTracker(false,a,"","sps")}());</script>' +
        '<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.src="//hm.baidu.com/hm.js?d12d3bdb9cb406172ef7f054d27e7ae0";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>';

    return gulp.src(path.build + '**/*')
        .pipe(filter)
        .pipe(replace('css/index.min.css', 'css/index.min.css?v=' + version))
        .pipe(replace('js/index.min.js', 'js/index.min.js?v=' + version))
        .pipe(replace('<!-- statistics -->', statistics))
        .pipe(filter.restore)
        .pipe(conn.dest(path.ftpPath));
});