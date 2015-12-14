"use strict";
define("screen.login", ["model.account", "screen.basic"], function () {
	RAD.model("model.login", Backbone.Model.extend({
		defaults: {
			"login_signin_email": "",
			"login_signin_password": "",
			"login_signup_fullname": "",
			"login_signup_email": "",
			"login_signup_password": "",
		},
		validate: function () {
			if (!this.get("login_signin_email") && !this.get("login_signup_email")) {
				return __("please fill email field");
			}
			if (!this.get("login_signin_password") && !this.get("login_signup_password")) {
				return __("please fill password field");
			}
			if (this.get("login_signup_password") && this.get("login_signup_email")) {
				let rName = [/^[a-zA-Z_@.!#$%&'*]{1,30}$/, /[.*]{1,255}/][1];
				if (!rName.test(this.get("login_signup_fullname"))) {
					return __("please fill name field");
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
			"tap   #login_signin_submit":   "eventTapSingninSubmit",
			//
			"keyup #login_signup_fullname": "eventKeyUp",
			"keyup #login_signup_email":    "eventKeyUp",
			"keyup #login_signup_password": "eventKeyUp",
			"tap   #login_signup_submit":   "eventTapSingupSubmit",
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
		eventInputEmail: function (event) {
			RAD.screen.basic.onInput.call(this, "email", event);
		},
		_jumpToElement: function (query) {
			this.$(query).trigger("tap").focus();
		},
		eventKeyUp: function (event) {
			switch (event.keyCode) {
				case 13:
					// Enter
					let jumpFromTo = {
						"login_signin_email": "#login_signin_password",
						"login_signin_password": "#login_signin_submit",
						"login_signup_fullname": "#login_signup_email",
						"login_signup_email": "#login_signup_password",
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
		eventTapSingninSubmit: function () {
			console.info("eventTapSingninSubmit");
			if (this.model.isValid()) {
				console.info("Valid");
				//RAD.application.login(this.model.get("email"), this.model.get("password"));
			} else {
				RAD.popup.toast("", this.model.validationError, "warning");
			}
		}
	}));
});

