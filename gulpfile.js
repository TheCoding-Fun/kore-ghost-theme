const { series, watch, src, dest, parallel } = require('gulp');
const pump = require('pump');

// gulp plugins and utils
const livereload = require('gulp-livereload');
const postcss = require('gulp-postcss');
const zip = require('gulp-zip');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const beeper = require('beeper');

// postcss plugins
const autoprefixer = require('autoprefixer');
const easyimport = require('postcss-easy-import');
const tailwindcss = require('@tailwindcss/postcss');

function serve(done) {
    livereload.listen();
    done();
}

const handleError = (done) => {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

function hbs(done) {
    pump([
        src(['*.hbs', 'partials/**/*.hbs']),
        livereload()
    ], handleError(done));
}

function css(done) {
    pump([
        src('assets/css/*.css', { sourcemaps: true }),
        postcss([
            easyimport,
            autoprefixer(),
            tailwindcss,
        ]),
        concat('content.css'),
        dest(['assets/built/'], { sourcemaps: '.' }),
        livereload()
    ], handleError(done));
}

function js(done) {
    pump([
        src([
            // pull in lib and custom files first so our own code can depend on it
            'assets/js/lib/*.js',
            'assets/js/custom/*.js',
            'assets/js/*.js'
        ], { sourcemaps: true }),
        concat('source.js'),
        uglify(),
        dest('assets/built/', { sourcemaps: '.' }),
        livereload()
    ], handleError(done));
}

function zipper(done) {
    const filename = require('./package.json').name + '.zip';

    pump([
        src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**',
            '!yarn-error.log',
            '!yarn.lock',
            '!gulpfile.js'
        ]),
        zip(filename),
        dest('dist/')
    ], handleError(done));
}

const cssWatcher = () => watch('assets/css/*.css', css);
const jsWatcher = () => watch('assets/js/**', js);
const hbsWatcher = () => watch(['*.hbs', 'partials/**/*.hbs'], hbs);
const watcher = parallel(cssWatcher, jsWatcher, hbsWatcher);
const build = series(css, js);

exports.build = build;
exports.zip = series(build, zipper);
exports.default = series(build, serve, watcher);
