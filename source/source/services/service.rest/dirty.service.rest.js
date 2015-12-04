"use strict";
define("service.rest", ["service.account", "helper.settings"], function () {
	/**
	 * @class RAD.service.rest
	 */
	RAD.service("service.rest", RAD.Blanks.Service.extend({
		onReceiveMsg: RAD.core.getService("service.basic").onReceiveMsg,
		onInitialize: function () {
			var headers = {};
			headers["Accept-Language"] = "ru";
			//headers["X-API-Version"] = "1.0.0";
			$.ajaxSetup({
				cache: false,
				contentType: "application/json",
				crossDomain: true,
				dataType: "json",
				headers: headers,
				timeout: 60e3,
				xhrFields: {
					//withCredentials: true,
				},
			});
			headers = null;
		},
		/**
		 * @param appendNew
		 * @return {Headers}
		 * @private
		 */
		_headersCompose: function (appendNew) {
			let headers = new Headers();
			headers.set("Accept", "application/json");
			//headers.set("Content-Type", "application/json");
			headers.set("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
			_.each(appendNew, (name, value) => headers.set(name, value));
			return headers;
			/*
			 // Create an empty Headers instance
			 var headers = new Headers();
			 // Add a few headers
			 headers.append('Content-Type', 'text/plain');
			 headers.append('X-My-Custom-Header', 'CustomValue');
			 // Check, get, and set header values
			 headers.has('Content-Type'); // true
			 headers.get('Content-Type'); // "text/plain"
			 headers.set('Content-Type', 'application/json');
			 // Delete a header
			 headers.delete('X-My-Custom-Header');
			 // Add initial values
			 var headers = new Headers({
			 'Content-Type': 'text/plain',
			 'X-My-Custom-Header': 'CustomValue'
			 });
			 */
		},
		/**
		 * @private
		 */
		_fetch: function () {
			var request = new Request(RAD.helper.settings.server.domain, {
				headers: this._headersCompose({
					//"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
				}),
				method: "GET",
				mode: "cors",
				credentials: ["include", "same-origin", "none"][2],
				cache: "no-cache",
				redirect: "follow",
				//body: JSON3.stringify({}),
				//method - GET, POST, PUT, DELETE, HEAD
				//url - URL of the request
				//headers - associated Headers object
				//referrer - referrer of the request
				//mode - cors, no-cors, same-origin
				//credentials - should cookies go with the request? omit, same-origin
				//redirect - follow, error, manual
				//integrity - subresource integrity value
				//cache - cache mode (default, reload, no-cache)
			});
			var Fetch = RAD.helper.fetch;
			Promise.race([Fetch.timeoutPromise(), fetch(request),])
				.then(Fetch.isPromise)
				.then(Fetch.isOk)
				.then(Fetch.statusOk)
				.then(Fetch.responseJson)
				.then(function (returnedValue) {
					console.info(returnedValue);
				})
				.catch(function (error) {
					console.error(error);
				});
		},
		/**
		 * Return basic options for fetch request
		 * @param {Object=} options
		 * @return {Object}
		 * @private
		 */
		_fetchOptions: function (options) {
			if (!options || !_.isPlainObject(options)) {
				options = {};
			}
			let basic = {
				headers: this._headersCompose(),
				method: "GET",
				mode: "cors",
				credentials: "none",
				cache: "no-cache",
				redirect: "follow",
			};
			return _.extend(basic, options);
		},
		_fetchCompose: function (request, timeout) {

		},
		auth: function (login = "", password = "", onSuccess = new Function, onError = new Function) {
			var request = new Request(RAD.helper.settings.server.domain, {
				method: "POST",
			});
			//

			//
			$.getJSON(RAD.helper.settings.server.domain, json => {
				this.publish("service.account.auth_new", json.data);
				onSuccess(json.data);
			}, (...args) => {
				console.warn("Error");
				onError(...args);
			});
		}
	}));
});
