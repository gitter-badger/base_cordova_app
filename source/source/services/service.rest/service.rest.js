"use strict";
define("service.rest", ["service.account", "helper.settings"], function () {
	/**
	 * @class RAD.service.rest
	 */
	RAD.service("service.rest", RAD.Blanks.Service.extend({
		onReceiveMsg: RAD.core.getService("service.basic").onReceiveMsg,
		/**
		 * @constructor
		 */
		onInitialize: function () {
			$.ajaxSetup({
				cache: false,
				contentType: "application/json",
				crossDomain: true,
				dataType: "json",
				headers: {
					"Accept-Language": "ru",
				},
				timeout: 60e3,
				xhrFields: {
					withCredentials: false,
				},
			});
		},
		/**
		 * Basic headers for REST
		 * @param headersToAppend
		 * @return {Headers}
		 * @private
		 */
		_headersCompose: function (headersToAppend) {
			let headers = new Headers();
			headers.set("Accept", "application/json");
			headers.set("Content-Type", "application/json");
			let accessToken = RAD.model("model.account").get("accessToken");
			if (accessToken) {
				headers.set("accessToken", accessToken);
			}
			_.each(headersToAppend, (name, value) => headers.set(name, value));
			return headers;
		},
		/**
		 * Return basic options for fetch request
		 * @param {Object=} options
		 * @return {Object}
		 * @private
		 */
		_fetchOptions: function (options) {
			if (!options || !_.isObject(options)) {
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
			if ("body" in options && _.isObject(options.body)) {
				options.body = JSON3.stringify(options.body);
			}
			return _.extend(basic, options);
		},
		/**
		 * Compose fetch request
		 * @param {String} url
		 * @param {Function} onSuccess
		 * @param {Function} onError
		 * @param {Object=} requrestOptions
		 * @param {Number=} timeoutInMs
		 * @private
		 */
		_fetch: function (url, onSuccess, onError, requrestOptions = {}, timeoutInMs = 60e3) {
			let request = new Request(url, this._fetchOptions(requrestOptions));
			var Fetch = RAD.helper.fetch;
			Promise.race([Fetch.timeoutPromise(timeoutInMs), fetch(request),])
				.then(Fetch.isPromise)
				.then(Fetch.isOk)
				.then(Fetch.statusOk)
				.then(Fetch.responseJson)
				.then(response => onSuccess(response))
				.catch(response => onError(response));
		},
		/**
		 * Compose url for fetch request
		 * @param {String=""} url
		 * @param {Boolean=true} addDomain
		 * @param {Object=} getParams
		 * @return {String}
		 * @private
		 */
		_urlCompose: function (url = "", addDomain = true, getParams = {}) {
			let link = "";
			if (addDomain) {
				link = RAD.helper.settings.server.domain + url;
			} else {
				link = url;
			}
			return link;
		},
		user_authorize: function (login, password, onSuccess, onError) {
			onSuccess || (onSuccess = function () {
				console.info(arguments[0]);
			});
			onError || (onError = function () {
				console.warn(arguments[0]);
			});
			let that = this;
			this._fetch(
				this._urlCompose("?path=user_authorize")
				, function fetchSuccess(json) {
					that.publish("service.account.user_authorize", json.data);
					onSuccess(json.data);
				}
				, function fetchError(...args) {
					onError(...args);
				}
			);
		},
		/**
		 * @example
		 * RAD.core.publish("service.rest.user_register", ["Anton Trofimenko", "rovius@mail.ru", "12345",]);
		 */
		user_register: function (fullname, email, password, onSuccess, onError) {
			onSuccess || (onSuccess = function () {
				console.info(arguments[0]);
			});
			onError || (onError = function () {
				console.warn(arguments[0]);
			});
			let that = this;
			this._fetch(
				this._urlCompose("?path=user_register")
				, function fetchSuccess(json) {
					that.publish("service.account.user_register", json.data);
					onSuccess(json.data);
				}
				, function fetchError(...args) {
					onError(...args);
				}
				, {
					method: "POST",
					body: {
						fullName: fullname,
						email: email,
						password: password,
					},
				}
			);
		},
		quiz_list: function () {
			//
		},
		quiz_start: function () {
			//
		},
		answer_send: function () {
			//
		},
	}));
});
