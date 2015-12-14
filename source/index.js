"use strict";
(function (document, window) {
	// don't remove ## marks, CLI uses them for updating this file
	// #script_begin#
	let scripts = [
		"source/application/application.js",
	];
	{
		let views = {
			screen: [
				"auth",
				"basic",
				"home",
				"login",
			],
			widget: [
				"spin",
			],
			popup: [
				"dialog",
				"toast",
			],
		};
		let models = {
			collection: [
				"phones",
			],
			model: [
				"account",
				"person",
			],
		};
		let services = {
			service: [
				"basic",
				"account",
				"rest",
			],
			helper: [
				"convert",
				"fetch",
				"storage",
				"settings",
				"translate",
			]
		};
		for (let block in views) {
			views[block].forEach(name => scripts.push(`source/views/${block}.${name}/${block}.${name}.js`));
		}
		for (let block in models) {
			models[block].forEach(name => scripts.push(`source/models/${block}.${name}/${block}.${name}.js`));
		}
		for (let block in services) {
			services[block].forEach(name => scripts.push(`source/services/${block}.${name}/${block}.${name}.js`));
		}
	}
	// #script_end#
	function onEndLoad() {
		let core = window.RAD.core,
			application = window.RAD.application,
			coreOptions = {
				defaultBackstack: false,
				defaultAnimation: "none",
				animationTimeout: 1,
				debug: false,
			};
		//initialize core by new application object
		core.initialize(application, coreOptions);
		//start
		application.start();
	}

	let paths = {
		application: "../source/application/application",
		cordova: "../cordova",
		rad: "../source/rad/rad",
	};
	let vendorNames = [
		"async",
		"backbone",
		"backbone.localStorage",
		"bootstrap",
		"core",
		"fast",
		"fetch",
		"immutable",
		"iscroll",
		"jquery",
		"json3",
		"localforage",
		"nprogress",
		"string",
		"types",
		"underscore",
		"webcomponents",
	];
	vendorNames.forEach(vendor => paths[vendor] = vendor + ".min");
	let shim = {
		"application": {deps: ["rad", "async",],},
		"backbone": {deps: ["jquery", "underscore",], exports: "Backbone",},
		"backbone.localStorage": {deps: ["backbone",],},
		"bootstrap": {deps: ["jquery",]},
		"cordova": {deps: [],},
		"rad": {deps: ["backbone", "cordova", "iscroll",],},
		"string": {exports: "S",},
		"underscore": {exports: "_",},
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
			url.forEach(loadUrl => loadCSS(loadUrl));
			return;
		}
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", url);
		document.getElementsByTagName("head")[0].appendChild(link);
	}

	loadCSS([
		"vendors/bootstrap.min.css",
		"source/assets/css/index.css",
	]);
	/**
	 * Insert links of with CSS files
	 * @param {Array|String} url
	 */
	function loadHTML(url) {
		if (Object.prototype.toString.call(url) === "[object Array]") {
			url.forEach(loadUrl => loadHTML(loadUrl));
			return;
		}
		let link = document.createElement("link");
		link.setAttribute("rel", "import");
		link.setAttribute("href", "vendors/" + url + ".html");
		document.getElementsByTagName("head")[0].appendChild(link);
	}

	let arrPath = Object.keys(paths);
	loadScript("vendors/require.min.js", function () {
		requirejs.config({
			baseUrl: "vendors",
			enforceDefine: false,
			paths: paths,
			shim: shim,
			waitSeconds: 2e3,
		});
		require(arrPath, function () {
				Array
					.from(arguments)
					.forEach(function (module, index) {
						if (!module) {
							return;
						}
						let name = arrPath[index];
						if (window[name]) {
							return;
						}
						if ((name in shim) && ("exports" in shim[name])) {
							window[shim[name]["exports"]] = module;
						} else {
							window[name] = module;
						}
					});
				//loadHTML([
				//	"polymer",
				//	"paper-button",
				//	"paper-button-behavior",
				//]);
				let include = {};
				let applicationjs = "source/application/application.js";
				scripts.forEach(scriptName => {
					if (scriptName !== applicationjs) {
						include[scriptName.split("/").pop().slice(0, -3)] = scriptName.slice(0, -3);
					}
				});
				requirejs.config({
					baseUrl: "",
					enforceDefine: true,
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
