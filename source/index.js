(function (document, window) {
	// don't remove ## marks, CLI uses them for updating this file
	// #script_begin#
	var scripts = [
		"source/views/screen.home/screen.home.js",
		"source/models/collection.phones/collection.phones.js",
		"source/models/model.person/model.person.js",
		"source/service/service.json_loader/service.json_loader.js",
		"source/application/application.js"
	];
	// #script_end#
	function onEndLoad() {
		let core = window.RAD.core,
			application = window.RAD.application,
			coreOptions = {
				defaultBackstack: false,
				defaultAnimation: 'none',
				animationTimeout: 3000,
				debug: false
			};
		//initialize core by new application object
		core.initialize(application, coreOptions);
		//start
		application.start();
	}
	var paths = {
		application: "../source/application/application",
		backbone: "backbone.min",
		cordova: "../cordova",
		iscroll: "iscroll.min",
		jquery: "jquery.min",
		rad: "../source/rad/rad",
		underscore: "underscore.min"
	};
	var vendorNames = [
		"core",
		"immutable",
		//"is", //current version has broken AMD module loading, also broken on WebPack
		"json3",
		"types"
	];
	vendorNames.forEach(function (vendor) {
		paths[vendor] = vendor + ".min";
	});
	var shim = {
		application: {
			deps: ["rad"]
		},
		rad: {
			deps: ["backbone", "cordova", "iscroll"]
		},
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		cordova: {}
	};
	shim.cordova.deps = vendorNames;

	/**
	 * Loads scripts
	 * @param {String} url
	 * @param {Function=} callback
	 */
	function loadScript(url, callback) {
		let script = document.createElement("script");
		script.setAttribute("src", url);
		script.setAttribute("async", "false");
		script.setAttribute("defer", "false");
		script.onreadystatechange = callback;
		script.onload = callback;
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	/**
	 * Insert links of with CSS files
	 * @param {Array|String} url
	 */
	function loadCSS(url) {
		if (Object.prototype.toString.call(url) === "[object Array]") {
			url.forEach(function (loadUrl) {
				loadCSS(loadUrl);
			});
			return;
		}
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", url);
		document.getElementsByTagName("head")[0].appendChild(link);
	}

	loadCSS([
		"source/assets/css/rad.css",
		"source/assets/css/transitions.css",
		"source/assets/css/index.css"
	]);
	loadScript("vendors/require.min.js", function () {
		requirejs.config({
			baseUrl: "vendors",
			paths: paths,
			shim: shim,
			waitSeconds: 5e3
		});
		require(["rad"], function () {
				let include = {};
				let applicationjs = "source/application/application.js";
				scripts.forEach(function (scriptName) {
					if (scriptName !== applicationjs) {
						include[scriptName.split("/").pop().slice(0, -3)] = scriptName.slice(0, -3);
					}
				});
				requirejs.config({
					baseUrl: "",
					paths: include,
					shim: {}
				});
				require(Object.keys(include), function () {
					window.RAD.scriptLoader.loadScripts([applicationjs], onEndLoad);
				});
			}
		);
	});
}(document, window));