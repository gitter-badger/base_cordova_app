"use strict";
define("service.rest", [
	"fast",
	"helper.settings",
	"service.account",
], function () {
	/**
	 * @class RAD.service.rest
	 */
	RAD.service("service.rest", RAD.Blanks.Service.extend({
		onReceiveMsg: RAD.core.getService("service.basic").onReceiveMsg,
		/**
		 * @constructor
		 */
		onInitialize: function () {
			// in case you prefer jQuery
			$.ajaxSetup({
				cache: false,
				contentType: "application/json",
				crossDomain: true,
				dataType: "json",
				headers: {
					"Accept-Language": "ru",
				},
				timeout: RAD.helper.settings.server.timeout,
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
			let opts = {};
			fast.assign(opts, basic, options);
			opts.method = opts.method.toUpperCase();
			return opts;
		},
		/**
		 * Compose fetch request
		 * @param {String} url
		 * @param {Function} done
		 * @param {Function} fail
		 * @param {Object=} requrestOptions
		 * @param {Number=} timeoutInMs
		 * @private
		 */
		_fetch: function (url, done, fail, requrestOptions = {}, timeoutInMs = RAD.helper.settings.server.timeout) {
			let request = new Request(url, this._fetchOptions(requrestOptions));
			let _fetch = RAD.helper.fetch;
			Promise.race([
					_fetch.timeoutPromise(timeoutInMs),
					window.fetch(request),
				])
				.then(_fetch.isPromise)
				.then(_fetch.isOk)
				.then(_fetch.statusOk)
				.then(_fetch.responseJson)
				.then(response => done(response))
				.catch(response => fail(response));
		},
		/**
		 * Compose url for fetch request
		 * @param {Array|String=""} url
		 * @param {Object=} params
		 * @param {Boolean=true} domain
		 * @return {String}
		 * @private
		 */
		_urlCompose: function (url = "", params = {}, domain = true) {
			if (Array.isArray(url)) {
				url = url.join("/");
			} else {
				url += "";
			}
			if (!_.isObject(params)) {
				params = {};
			}
			params = $.param(params);
			let link = "";
			if (domain) {
				link = RAD.helper.settings.server.domain + url;
			} else {
				link = url;
			}
			return link + "?" + params;
		},
		_done: function (response) {
			console.info(response);
		},
		_fail: function (response) {
			console.warn(response);
		},
		_always: function (response) {
			console.log(response);
		},
		/**
		 * @param {string} email
		 * @param {string} password
		 * @param {Function=} done
		 * @param {Function=} fail
		 * @param {Function=} always
		 * RAD.core.publish("service.rest.user_authorize", ["r@gmail.com", "12345",]);
		 */
		account_signin: function (email, password, done = this._done, fail = this._fail, always = this._always) {
			let timerId = _.delay(RAD.widget.spin.show, 500);
			this._fetch(
				this._urlCompose(["account", "signin"]),
				json => {
					clearTimeout(timerId);
					RAD.widget.spin.hide();
					this.publish("service.account.signin", [json.data]);
					done(json);
					_.execute(always, [json]);
				},
				(...args) => {
					clearTimeout(timerId);
					RAD.widget.spin.hide();
					fail(...args);
					_.execute(always, [args]);
				},
				{
					method: "POST",
					body: {
						email, password,
					},
				}
			);
		},
		/**
		 * Register user
		 * @param {String} fullName
		 * @param {String} email
		 * @param {String} password
		 * @param {Function=} done
		 * @param {Function=} fail
		 * @example
		 * RAD.core.publish("service.rest.user_register", ["Anton Trofimenko", "r@gmail.com", "12345",]);
		 */
		account_signup: function (fullName, email, password, done = this._done, fail = this._fail) {
			this._fetch(
				this._urlCompose(["account", "signup"]),
				json => {
					this.publish("service.account.signup", json.data);
					done(json);
				},
				(...args) => fail(...args),
				{
					method: "POST",
					body: {
						fullName, email, password,
					},
				}
			);
		},
		/**
		 * @example RAD.core.publish("service.rest.quiz_list");
		 */
		quiz_list: function (done = this._done, fail = this._fail) {
			this._fetch(
				this._urlCompose("quiz"),
				json => done(json),
				(...args) => fail(...args)
			);
		},
		quiz_start: function (quizId, done = this._done, fail = this._fail) {
			this._fetch(
				this._urlCompose(["quiz", "start"]),
				json => done(json),
				(...args) => fail(...args),
				{
					method: "POST",
					body: {
						quizId,
					}
				}
			);
		},
		/**
		 * @param {String} questionId
		 * @param {String|String[]} answerIds
		 * @param {Function=} done
		 * @param {Function=} fail
		 */
		answer_send: function (questionId, answerIds, done = this._done, fail = this._fail) {
			this._fetch(
				this._urlCompose(["answer", "send"]),
				json => done(json),
				(...args) => fail(...args),
				{
					method: "POST",
					body: {
						questionId,
						answerIds,
					}
				}
			);
		},
	}));
});
