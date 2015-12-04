"use strict";
define("helper.settings", [], function () {
	/**
	 * @class RAD.helper.settings
	 */
	RAD.namespace("helper.settings", {
		server: {
			/**
			 * @type {String}
			 */
			domain: "http://localhost:3000/",
			/**
			 * @type {Number}
			 */
			timeout: 60e3,
		},
		/**
		 * @type {String}
		 */
		language: "ru",
		/**
		 * @type {String}
		 */
		app_version: "1.0.0",
		/**
		 * @type {Boolean}
		 */
		debug: false,
	});
});
