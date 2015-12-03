"use strict";
define("helper.fetch", ["helper.settings"], function () {
	/**
	 * @class RAD.helper.fetch
	 */
	RAD.namespace("helper.fetch", {
		timeoutPromise: function (ms) {
			if (!ms) {
				ms = RAD.helper.settings.server.timeout;
			}
			return new Promise(function (resolve) {
				setTimeout(resolve, ms);
			});
		},
		isPromise: function (response) {
			if (response instanceof Response) {
				return response;
			} else {
				throw new Error("Timeout");
			}
		},
		isOk: function (response) {
			if (response.ok) {
				return response;
			} else {
				var error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
		},
		responseJson: function (response) {
			//console.log(response.headers.get('Content-Type'));
			//console.log(response.headers.get('Date'));
			//console.log(response.status);
			//console.log(response.statusText);
			//console.log(response.type);
			//console.log(response.url);
			return response.json();
		},
		statusOk: function (response) {
			if (response.status >= 200 && response.status < 300) {
				return response;
			} else {
				var error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
		}
	});
});
