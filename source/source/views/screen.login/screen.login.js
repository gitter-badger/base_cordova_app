"use strict";
define("screen.login"
	, ["model.account", "screen.basic", "helper.fetch", "helper.translate"]
	, function () {
	RAD.model("model.login", Backbone.Model.extend({
		defaults: {
			"login_signin_email": "",
			"login_signin_password": "",
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
	/**
	 * @class RAD.screen.login
	 */
	RAD.view("screen.login", RAD.Blanks.View.extend({
		url: "source/views/screen.login/screen.login.ejs",
		className: "override-scroll",
		/**
		 * @see RAD.collection.phones
		 */
		model: RAD.model("model.login"),
		events: {
			"keyup #login_signin_email":    "eventKeyUp",
			"keyup #login_signin_password": "eventKeyUp",
			"tap   #login_signin_submit":   "eventTapSigninSubmit",
			//
			"keyup #login_signup_fullname": "eventKeyUp",
			"keyup #login_signup_email":    "eventKeyUp",
			"keyup #login_signup_password": "eventKeyUp",
			"tap   #login_signup_submit":   "eventTapSignupSubmit",
			//
			"input          #login_signin_email":    "eventInputSigninEmail",
			"propertychange #login_signin_email":    "eventInputSigninEmail",
			"input          #login_signin_password": "eventInputSigninPassword",
			"propertychange #login_signin_password": "eventInputSigninPassword",
			//
			"input          #login_signup_fullname": "eventInputSignupFullname",
			"propertychange #login_signup_fullname": "eventInputSignupFullname",
			"input          #login_signup_email":    "eventInputSignupEmail",
			"propertychange #login_signup_email":    "eventInputSignupEmail",
			"input          #login_signup_password": "eventInputSignupPassword",
			"propertychange #login_signup_password": "eventInputSignupPassword",
		},
		onStartAttach: function () {
			this.model.trigger("change");
		},
		eventInputSigninEmail: function (event) {
			RAD.screen.basic.onInput.call(this, "login_signin_email", event);
		},
		eventInputSigninPassword: function (event) {
			RAD.screen.basic.onInput.call(this, "login_signin_password", event);
		},
		eventInputSignupFullname: function(event) {
			RAD.screen.basic.onInput.call(this, "login_signup_fullname", event);
		},
		eventInputSignupEmail: function (event) {
			RAD.screen.basic.onInput.call(this, "login_signup_email", event);
		},
		eventInputSignupPassword: function (event) {
			RAD.screen.basic.onInput.call(this, "login_signup_password", event);
		},
		_jumpToElement: function (query) {
			this.$(query).trigger("tap").focus();
		},
		eventKeyUp: function (event) {
			switch (event.keyCode) {
				case 13:
					// Enter
					let jumpFromTo = {
						"login_signin_email":    "#login_signin_password",
						"login_signin_password": "#login_signin_submit",
						"login_signup_fullname": "#login_signup_email",
						"login_signup_email":    "#login_signup_password",
						"login_signup_password": "#login_signup_submit",
					};
					if (Object.keys(jumpFromTo).includes(event.currentTarget.id)) {
						this._jumpToElement(jumpFromTo[event.currentTarget.id]);
					}
					break;
				case 9:
					// Tab
					break;
			}
		},
		eventTapSigninSubmit: function () {
			if (this.model.isValid({signin: true})) {
				let signin = [
					this.model.get("login_signin_email"),
					this.model.get("login_signin_password"),
					function (response) {
						// @todo go to login screen
						this.publish("", response);
					},
					RAD.popup.toast.server_error,
				];
				RAD.core.publish("service.rest.user_signin", signin);
			} else {
				RAD.popup.toast("", this.model.validationError, "warning");
			}
		},
		eventTapSignupSubmit: function () {
			if (this.model.isValid({signup: true})) {
				let signup = [
					this.model.get("login_signup_fullname"),
					this.model.get("login_signup_email"),
					this.model.get("login_signup_password"),
					function (response) {
						// @todo go to login screen
						this.publish("", response);
					},
					RAD.popup.toast.server_error,
				];
				RAD.core.publish("service.rest.user_signup", signup);
			} else {
				RAD.popup.toast("", this.model.validationError, "warning");
			}
		}
	}));
});
