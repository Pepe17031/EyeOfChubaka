const { series, src, dest, parallel, watch } = require("gulp");
const browsersync = require("browser-sync");
const CleanCSS = require("gulp-clean-css");
const del = require("del");
const fileinclude = require("gulp-file-include");
const npmdist = require("gulp-npm-dist");
const newer = require("gulp-newer");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const postcss = require('gulp-postcss');
const autoprefixer = require("autoprefixer");
const tailwindcss = require('tailwindcss');
const webpack = require('webpack-stream')

const paths = {
    baseSrc: "src/",
    baseDist: "static/",
    configTailwind: "./tailwind.config.js",
};

const clean = function (done) {
    del.sync(paths.baseDist, done());
};

const vendor = function () {
    const out = paths.baseDist + "plugins/";
    return src(npmdist(), { base: "./node_modules" })
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
        }))
        .pipe(dest(out));
};

const html = function () {
    const srcPath = paths.baseSrc + "/";
    const out = paths.baseDist;
    return src([
        srcPath + "*.html",
        srcPath + "*.ico",
        srcPath + "*.png",
    ])
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file",
                indent: true,
            })
        )
        .pipe(dest(out));
};

const data = function () {
    const out = paths.baseDist + "data/";
    return src([paths.baseSrc + "data/**/*"])
        .pipe(dest(out));
};

const fonts = function () {
    const out = paths.baseDist + "fonts/";
    return src([paths.baseSrc + "fonts/**/*"])
        .pipe(newer(out))
        .pipe(dest(out));
};

const images = function () {
    var out = paths.baseDist + "images";
    return src(paths.baseSrc + "images/**/*")
        .pipe(dest(out));
};

const javascript = function () {
    const out = paths.baseDist + "js/";
    return src(paths.baseSrc + "js/**/*.js")
            .pipe(webpack({
            mode: "development",
                module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {loader: "babel-loader"},
                    },
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader'],
                    },
                ],
            },
            optimization: {
                minimize: true,
            }

        }))
        .pipe(dest(out));
};

const css = function () {
    const out = paths.baseDist + "css/";
    return src(paths.baseSrc + "scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass.sync())
        .pipe(postcss([
            tailwindcss(paths.configTailwind),
            autoprefixer()
        ]))
        .pipe(dest(out))
        .pipe(CleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("./"))
        .pipe(dest(out));
};

const base_css = function () {
    const out = paths.baseDist + "css/";
    return src(paths.baseSrc + "css/*.css")
        .pipe(dest(out));
};

const initBrowserSync = function (done) {
    const startPath = "/index.html";
    browsersync.init({
        startPath: startPath,
        server: {
            baseDir: paths.baseDist,
            middleware: [
                function (req, res, next) {
                    req.method = "GET";
                    next();
                },
            ],
        },
    });
    done();
}

const reloadBrowserSync = function (done) {
    browsersync.reload();
    done();
}

function watchFiles() {
    watch(paths.baseSrc + "**/*.html", series([html, css], reloadBrowserSync));
    watch(paths.baseSrc + "data/**/*", series(data, reloadBrowserSync));
    watch(paths.baseSrc+ "fonts/**/*", series(fonts, reloadBrowserSync));
    watch(paths.baseSrc + "images/**/*", series(images, reloadBrowserSync));
    watch(paths.baseSrc + "js/**/*", series(javascript, reloadBrowserSync));
    watch([paths.baseSrc + "scss/**/*.scss", paths.configTailwind], series(css, reloadBrowserSync));
}

exports.default = series(
    clean,
    html,
    vendor,
    parallel(data, fonts, images, javascript, css, base_css),
    parallel(watchFiles),
    //parallel(watchFiles, initBrowserSync)
);

exports.build = series(
    clean,
    html,
    vendor,
    parallel(data, fonts, images, javascript, css, base_css)
);