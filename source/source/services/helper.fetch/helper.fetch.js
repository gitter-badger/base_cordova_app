"use strict";
define("helper.fetch", [
	"helper.settings",
	"helper.translate",
], function () {
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
				let error = new Error("Timeout");
				error.message = "Timeout";
				error.response = response;
				throw error;
			}
		},
		isOk: function (response) {
			if (response.ok) {
				return response;
			} else {
				let error = new Error(response.statusText || response.status);
				error.message = response.statusText || response.status;
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
				let error = new Error(response.statusText || response.status);
				error.response = response;
				throw error;
			}
		},
		getErrorText: function (text) {
			if ("message" in text) {
				text = text.message;
			}
			switch (text) {
				case "TypeError: Failed to fetch":
				case "Failed to fetch":
					return __("err_internet_desconnected");
					break;
				case "Error: Timeout":
				case "Timeout":
					return __("err_internet_timeout");
					break;
				default:
					return text;
					break;
			}
		}
	});
});
