"use strict";
define("model.login", [
	"helper.fetch",
	"helper.translate",
	"helper.util",
	"model.account",
], function () {
	RAD.model("model.login", Backbone.Model.extend({
		defaults: {
			"login_signin_email": "test@test.test",
			"login_signin_password": "12345",
			"login_signup_fullname": "",
			"login_signup_email": "",
			"login_signup_password": "",
		},
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
			if (options.signup) {
				if (!attrs.login_signup_email) {
					return __("please fill email field");
				}
				if (!RAD.helper.util.validate.email(attrs.login_signup_email)) {
					return __("email field is incorrect");
				}
				if (!attrs.login_signup_password) {
					return __("please fill password field");
				}
				attrs.login_signup_fullname = attrs.login_signup_fullname.trim();
				if (!RAD.helper.util.validate.fullName(attrs.login_signup_fullname)) {
					return __("please fill full name field");
				}
			}
		}
	}), true);
});
