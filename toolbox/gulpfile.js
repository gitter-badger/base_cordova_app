var gulp = (function () {

	////////////////////
	// Node modules
	////////////////////

	/** Load modules */
	var del = require("del");
	var gulp = require("gulp");
	var gulp_babel = require("gulp-babel");
	var gulp_bower = require("gulp-bower");
	var gulp_cache = require("gulp-cache");
	var gulp_connect = require("gulp-connect");
	var gulp_csso = require("gulp-csso");
	var gulp_imagemin = require("gulp-imagemin");
	var gulp_jade = require("gulp-jade");
	var gulp_less = require("gulp-less");
	var gulp_myth = require("gulp-myth");
	var gulp_prettify = require("gulp-prettify");
	var gulp_rename = require("gulp-rename");
	var gulp_rigger = require("gulp-rigger");
	var gulp_sourcemaps = require("gulp-sourcemaps");
	var gulp_uglify = require("gulp-uglify");
	var gulp_watch = require("gulp-watch");
	var imagemin_pngquant = require("imagemin-pngquant");
	var jade = require("jade");
	var jade_babel = require("jade-babel");
	jade = jade_babel({}, jade);
	var main_bower_files = require("main-bower-files");
	var opn = require("opn");
	var path = require("path");
	var rimraf = require("rimraf");
	var run_sequence = require("run-sequence");
	var vars = require("./vars.json");

	////////////////////
	// Configuration
	////////////////////

	var cfg = (function () {
		var config = {};
		var folder = {
			css: "/source/assets/css/",
			dest: "./../cordova/www",
			font: "/source/assets/font/",
			images: "/source/assets/img/",
			js: "/",
			source: "../source",
			vendors: "/vendors/"
		};
		config.src = {
			clean: [
				folder.dest + "/*"
			],
			font: [
				folder.source + folder.font + "**/*"
			],
			images: [
				folder.source + folder.images + "**/*"
			],
			html: [
				folder.source + "/**/*.html",
				"!" + folder.source + "/**/_*.html",
				"!" + folder.source + folder.vendors + "**/*.html"
			],
			jade: [
				folder.source + "/**/*.jade",
				"!" + folder.source + "/**/_*.jade"
			],
			js: [
				folder.source + folder.js + "**/*.js",
				"!" + folder.source + folder.vendors + "**/*.js"
			],
			js_vendors: [
				folder.dest + folder.vendors + "*.js",
				"!" + folder.dest + folder.vendors + "*.min.js"
			],
			js_vendors_clean: [
				folder.dest + folder.vendors + "**/*.js",
				"!" + folder.dest + folder.vendors + "**/*.min.js"
			],
			less: [
				folder.source + folder.css + "*.less",
				folder.source + folder.css + "*.css",
				"!" + folder.source + folder.css + "_*.less",
				"!" + folder.source + folder.css + "_*.css"
			]
		};
		config.watch = {
			jade: [
				folder.source + "/**/*.jade"
			],
			js_vendors: [
				folder.source + folder.vendors + "**/*.*"
			],
			less: [
				folder.source + folder.css + "*.less",
				folder.source + folder.css + "*.css"
			]
		};
		config.dest = {
			css: folder.dest + folder.css,
			font: folder.dest + folder.font,
			html: folder.dest + "/",
			images: folder.dest + folder.images,
			js: folder.dest + folder.js,
			js_vendors: folder.dest + folder.vendors
		};
		config.task = {
			babel_debug: {
				experimental: false,
				playground: false,
				sourceMap: false
			},
			babel_prod: {
				experimental: false,
				playground: false,
				sourceMap: false
			},
			csso: true,
			imagemin: {
				interlaced: true,
				optimizationLevel: 3,
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [imagemin_pngquant()]
			},
			jade: {
				locals: vars,
				pretty: "\t"
			},
			less: {
				paths: [path.join(__dirname, "less", "includes")],
				plugins: []
			},
			myth: {
				browsers: ["last 10 version", "Android 2"]
			},
			prettify: {
				indent_char: "\t",
				indent_level: 0,
				indent_size: 1,
				indent_with_tabs: true,
				max_preserve_newlines: 0,
				preserve_newlines: true,
				wrap_attributes: "auto"
			},
			uglify_vendors: {
				outSourceMap: false,
				compress: {
					sequences: true,
					unsafe: false,
					warnings: false
				}
			},
			uglify_prod: {
				outSourceMap: false,
				compress: {
					sequences: false,
					unsafe: false,
					warnings: true
				}
			},
			uglify_debug: {
				outSourceMap: false,
				sequences: false,
				unsafe: false,
				warnings: false
			}
		};
		return config;
	} ());

	////////////////////
	// Gulp Actions
	////////////////////
	/**
	 * If there are errors, the findings and continue
	 * @param {Object} error
	 */
	function swallowError (error) {
		console.log(error.toString());
		this.emit("end");
	}
	/** Clear compiled folder */
	gulp.task("clean", function (callback) {
		del(cfg.src.clean, {force: true}, callback);
	});
	/** Copmpose LESS into CSS */
	gulp.task("less_debug", function () {
		return gulp
			.src(cfg.src.less)
			.pipe(gulp_sourcemaps.init())
			.pipe(gulp_less(cfg.task.less))
			.on("error", swallowError)
			.pipe(gulp_myth(cfg.task.myth))
			.pipe(gulp_csso(cfg.task.csso))
			.pipe(gulp_sourcemaps.write())
			.pipe(gulp.dest(cfg.dest.css))
			.pipe(gulp_connect.reload());
	});
	/** Copmpose LESS into CSS */
	gulp.task("less_prod", function () {
		return gulp
			.src(cfg.src.less)
			.pipe(gulp_less(cfg.task.less))
			.on("error", swallowError)
			.pipe(gulp_myth(cfg.task.myth))
			.pipe(gulp_csso(cfg.task.csso))
			.pipe(gulp.dest(cfg.dest.css))
			.pipe(gulp_connect.reload());
	});
	/** Compose HTML from Jade */
	gulp.task("jade", ["html"], function () {
		return gulp
			.src(cfg.src.jade)
			.pipe(gulp_jade(cfg.task.jade))
			.on("error", swallowError)
			.pipe(gulp.dest(cfg.dest.html))
			.pipe(gulp_connect.reload());
	});
	/** Copy HTML */
	gulp.task("html", function () {
		return gulp
			.src(cfg.src.html)
			.pipe(gulp_rigger())
			.pipe(gulp_prettify(cfg.task.prettify))
			.pipe(gulp.dest(cfg.dest.html))
			.pipe(gulp_connect.reload());
	});
	/** Copy HTML */
	gulp.task("font", function () {
		return gulp
			.src(cfg.src.font)
			.pipe(gulp.dest(cfg.dest.font))
			.on("error", swallowError)
			.pipe(gulp_connect.reload());
	});
	/** Compile JS for release */
	gulp.task("js_prod", function () {
		return gulp
			.src(cfg.src.js)
			.pipe(gulp_babel(cfg.task.babel_prod))
			.on("error", swallowError)
			.pipe(gulp_uglify(cfg.task.uglify_prod))
			.on("error", swallowError)
			.pipe(gulp.dest(cfg.dest.js))
			.pipe(gulp_connect.reload());
	});
	/** Compile JS for debug */
	gulp.task("js_debug", function () {
		return gulp
			.src(cfg.src.js)
			.pipe(gulp_sourcemaps.init())
			.pipe(gulp_babel(cfg.task.babel_debug))
			.on("error", swallowError)
			.pipe(gulp_uglify(cfg.task.uglify_debug))
			.on("error", swallowError)
			.pipe(gulp_sourcemaps.write("."))
			.pipe(gulp.dest(cfg.dest.js))
			.pipe(gulp_connect.reload());
	});
	/** Copy main bower files to build folder */
	gulp.task("js_vendors", function () {
		return gulp
			.src(main_bower_files(), {base: ""})
			.on("error", swallowError)
			.pipe(gulp.dest(cfg.dest.js_vendors));
	});
	/** Minify vendors if possible */
	gulp.task("js_vendors_min", ["js_vendors"], function () {
		return gulp
			.src(cfg.src.js_vendors)
			.pipe(gulp_uglify(cfg.task.uglify_vendors))
			.on("error", swallowError)
			.pipe(gulp_rename(function (path) {
				path.basename += ".min";
			}))
			.pipe(gulp.dest(cfg.dest.js_vendors)
		);
	});
	/** Remove unneccesary vendor files */
	gulp.task("js_vendors_clean", ["js_vendors_min"], function (callback) {
		del(cfg.src.js_vendors_clean, {force: true}, callback);
	});
	/** Copy vendor libraries to destination folder */
	gulp.task("js_lib", function (callback) {
		run_sequence("js_vendors", "js_vendors_min", "js_vendors_clean", callback);
	});
	/** Copy and minimize image */
	gulp.task("images", function () {
		return gulp
			.src(cfg.src.images)
			.pipe(gulp_cache(gulp_imagemin(cfg.task.imagemin)))
			.pipe(gulp.dest(cfg.dest.images))
			.pipe(gulp_connect.reload());
	});
	/** Watch for file changes */
	gulp.task("watch", ["compile_debug"], function() {
		gulp_watch(cfg.src.font, function () {
			gulp.start("font");
		});
		gulp_watch(cfg.src.html, function () {
			gulp.start("html");
		});
		gulp_watch(cfg.watch.jade, function () {
			gulp.start("jade");
		});
		gulp_watch(cfg.watch.less, function () {
			gulp.start("less_debug");
		});
		gulp_watch(cfg.src.js, function () {
			gulp.start("js_debug");
		});
		gulp_watch(cfg.watch.js_vendors, function () {
			gulp.start("js_lib");
		});
		gulp_watch(cfg.src.images, function () {
			gulp.start("images");
		});
	});
	/** Release build */
	gulp.task("compile_release", ["clean"], function () {
		gulp.start(["font", "html", "jade", "less_prod", "js_prod", "js_lib", "images"]);
	});
	/** Debug build */
	gulp.task("compile_debug", ["clean"], function () {
		return gulp.start(["font", "html", "jade", "less_debug", "js_debug", "js_lib", "images"]);
	});
	/** Update bower included libraries */
	gulp.task("bower_update", function () {
		return gulp_bower({cmd: "check-new"});
	});
	/** Run everything without `cordova` folder, should change `../cordova/www/` folder to `/build/` */
	gulp.task("without_cordova", ["watch", "webserver", "openbrowser"]);
	/** Defaul task */
	gulp.task("default", function () {
		gulp.start("compile_debug");
	});
	return gulp;
}());