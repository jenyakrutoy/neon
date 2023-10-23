const { src, dest, series, watch, parallel } = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const fileinclude = require("gulp-file-include");
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const imageMin = require('gulp-imagemin')
const babel = require('gulp-babel')
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require('browser-sync').create()
const scss = require('gulp-sass')(require('sass'))
const autoprefixer = require("gulp-autoprefixer")
const group_media = require("gulp-group-css-media-queries")
const rename = require("gulp-rename")
const clean_css = require("gulp-clean-css")
const webp = require('gulp-webp')
const webphtml = require('gulp-webp-html')
// const webpCss = require('gulp-webpcss')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')


const clean = () => {
  return del(['dist'])
}


function htmlDev() {
  return src(['src/**/*.html', '!' + 'src/**/_*.html'])
    .pipe(fileinclude())
    // .pipe(webphtml())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}


const htmlBuild = () => {
  return src(['src/**/*.html', '!' + 'src/**/_*.html'])
    .pipe(fileinclude())
    // .pipe(webphtml())
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}


function cssDev() {
  return src('src/scss/style.scss')
    // .pipe(plumber())
    .pipe(
      scss({
        outputStyle: "expanded"
      })
    )
    .pipe(group_media())
    .pipe(
      autoprefixer({
        grid: true,
        overrideBrowserslist: ["last 5 versions"],
        cascade: true
      })
    )
    // .pipe(webpcss(
    //   ['.jpg', '.jpeg', '.png']
    // ))
    .pipe(dest('dist/css'))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function cssBuild() {
  return src('src/scss/style.scss')
    // .pipe(plumber())
    .pipe(
      scss({
        outputStyle: "expanded"
      })
    )
    .pipe(group_media())
    .pipe(
      autoprefixer({
        grid: true,
        overrideBrowserslist: ["last 5 versions"],
        cascade: true
      })
    )
    // .pipe(webpcss(
    //   ['.jpg', '.jpeg', '.png']
    // ))
    // .pipe(dest('dist/css'))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function jsDev() {
  return src('src/**/*.js')
    .pipe(dest('dist'))
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    .pipe(fileinclude())
    .pipe(concat('js/script.min.js'))
    // .pipe(dest('dist'))
    .pipe(uglify({
      toplevel: true
    }).on('error', notify.onError()))
    // .pipe(
    //   rename({
    //     extname: ".min.js"
    //   })
    // )
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}


function jsBuild() {
  return src('src/**/*.js')
    // .pipe(dest('dist/js/src'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(fileinclude())
    .pipe(concat('js/script.min.js'))
    .pipe(dest('dist'))
    .pipe(uglify({
      toplevel: true
    }).on('error', notify.onError()))
    // .pipe(
    //   rename({
    //     extname: ".min.js"
    //   })
    // )
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}


const images = () => {
  return src(['src/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}', '!**/favicon.*', '!src/img/layout/*.*'])
    .pipe(
      webp({
        quality: 75
      })
    )
    .pipe(src(['src/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}', '!**/favicon.*', '!src/img/layout/*.*']))
    .pipe(dest('dist/img'))
    .pipe(
      imageMin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3 // 0 to 7
      })
    )
    .pipe(src(['src/img/favicon.*', '!src/img/layout/*.*']))
    .pipe(dest('dist/img'))
    .pipe(browserSync.stream())
}


function fonts() {
  src('src/fonts/*')
    .pipe(ttf2woff())
    .pipe(dest('dist/fonts'))
  return src('src/fonts/*')
    .pipe(ttf2woff2())
    .pipe(dest('dist/fonts'))
}


function svgSprites() {
  return gulp.src('src/img/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../icons/icons.svg',
          example: true
        }
      },
    }
    ))
    .pipe(dest('dist/img'))
}


gulp.task('otf2ttf', function () {
  return gulp.src('src/fonts/*otf')
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(dest('src/fonts'))
})


const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
      // routes: {
      //   '/node_modules': 'node_modules'
      // }
    }
  })
}


watch('src/**/*.html', htmlDev, htmlBuild)
watch('src/scss/**/*.scss', cssDev, cssBuild)
watch('src/js/**/*.js', jsDev, jsBuild)
watch('src/img/**', images)
watch('src/fonts/*', fonts)
// watch('src/img/iconsprite/*.svg', svgSprite)


exports.htmlDev = htmlDev
exports.htmlBuild = htmlBuild
exports.css = cssDev
exports.css = cssBuild
exports.jsDev = jsDev
exports.jsBuild = jsBuild
exports.images = images
exports.fonts = fonts
exports.clean = clean
exports.svgSprite = svgSprite


exports.dev = series(clean, parallel(htmlDev, cssDev, jsDev, images, fonts), svgSprites, watchFiles)
exports.build = series(clean, parallel(htmlBuild, cssBuild, jsBuild, images, fonts), svgSprites, watchFiles)
