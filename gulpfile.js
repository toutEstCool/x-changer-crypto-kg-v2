const gulp = require('gulp')
const del = require('del')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const nodemon = require('gulp-nodemon')

const tsProject = ts.createProject('tsconfig.json')
const outputDir = './dist'
const sourceMask = './src/**/*'
const sourceMaskTS = `${sourceMask}.ts`

const clean = () => {
	return del(outputDir)
}

const build = () => {
	return gulp
		.src(sourceMaskTS)
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(tsProject())
		.js.pipe(
			sourcemaps.write('./', {
				includeContent: false,
				sourceRoot: '.',
			})
		)
		.pipe(gulp.dest(outputDir))
}

const defaultTask = gulp.series(clean, build)

const watchTask = () => {
	gulp.watch(sourceMaskTS, build)
}

const botTestTask = done => {
	return nodemon({
		script: `${outputDir}/bot/bot.js`,
		watch: outputDir,
		delay: '1000',
		done,
	})
}

const devTask = done => {
	watchTask(), gulp.series(defaultTask, botTestTask)(done)
}
exports.botTest = botTestTask
exports.dev = devTask
exports.watch = watchTask
exports.default = defaultTask
