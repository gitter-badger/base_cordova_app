"use strict";
define("model.navigation", [
	"helper.translate",
	"helper.util",
	"model.account",
	"model.basic",
	"service.account",
], function () {
	let ModelNavigation = {
		defaults: {
			title: "",
			mode: "login",
			"login_signin_email": "test@test.test", // @todo remove
			"login_signin_password": "12345", // @todo remove
			is_session_active: function () {
				return !!RAD.model("model.account").get("accessToken");
			},
			fullName: function () {
				return RAD.model("model.account").get("fullName");
			},
		},
		initialize: function () {
			this.set("title", __("navigation title"));
			RAD.core.publish("service.account.is_active", (error, active) => this.accountEvent(active), "sticky");
			RAD.core.subscribe("service.account.signin", this.accountEvent.bind(this));
			RAD.core.subscribe("service.account.signup", this.accountEvent.bind(this));
			RAD.core.subscribe("service.account.signed_in", this.accountEvent.bind(this));
		},
		get: function (attrName) {
			return _.getResult(Backbone.Model.prototype.get.call(this, attrName), this);
		},
		/**
		 * @override Backbone.Model.prototype.toJSON
		 */
		toJSON: RAD.model("model.basic").toJSON(),
		validate: function (attrs, options) {
			if (options.signin) {
				if (!attrs.login_signin_email) {
					return __("please fill email field");
				}
				if (!RAD.helper.util.validate.email(attrs.login_signin_email)) {
					return __("email field is incorrect");
				}
				if (!attrs.login_signin_password) {
					return __("please fill password field");
				}
			}
		},
		accountEvent: function (active) {
			if (active) {
				this.set("mode", "active");
			} else {
				this.set("mode", "login");
			}
		}
	};
	/**
	 * @class RAD.model.navigation
	 */
	RAD.model("model.navigation", Backbone.Model.extend(ModelNavigation), true);
});
