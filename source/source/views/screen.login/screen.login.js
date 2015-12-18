"use strict";
define("screen.login", [
	"helper.fetch",
	"helper.translate",
	"model.account",
	"model.login",
	"screen.basic",
], function () {
	let onInput = RAD.screen.basic.onInput;
	/**
	 * @class RAD.screen.login
	 */
	RAD.view("screen.login", RAD.Blanks.View.extend({
		url: "source/views/screen.login/screen.login.ejs",
		className: "override-scroll",
		/**
		 * @see RAD.model.login
		 */
		model: RAD.model("model.login"),
		events: {
			"keyup #login_signin_email": "eventKeyUp",
			"keyup #login_signin_password": "eventKeyUp",
			"tap   #login_signin_submit": "eventTapSigninSubmit",
			//
			"keyup #login_signup_fullname": "eventKeyUp",
			"keyup #login_signup_email": "eventKeyUp",
			"keyup #login_signup_password": "eventKeyUp",
			"tap   #login_signup_submit": "eventTapSignupSubmit",
			//
			"input          #login_signin_email": "eventInputSigninEmail",
			"propertychange #login_signin_email": "eventInputSigninEmail",
			"input          #login_signin_password": "eventInputSigninPassword",
			"propertychange #login_signin_password": "eventInputSigninPassword",
			//
			"input          #login_signup_fullname": "eventInputSignupFullname",
			"propertychange #login_signup_fullname": "eventInputSignupFullname",
			"input          #login_signup_email": "eventInputSignupEmail",
			"propertychange #login_signup_email": "eventInputSignupEmail",
			"input          #login_signup_password": "eventInputSignupPassword",
			"propertychange #login_signup_password": "eventInputSignupPassword",
		},
		onStartAttach: function () {
			this.model.trigger("change");
		},
		eventInputSigninEmail: function (event) {
			onInput.call(this, "login_signin_email", event);
		},
		eventInputSigninPassword: function (event) {
			onInput.call(this, "login_signin_password", event);
		},
		eventInputSignupFullname: function (event) {
			onInput.call(this, "login_signup_fullname", event);
		},
		eventInputSignupEmail: function (event) {
			onInput.call(this, "login_signup_email", event);
		},
		eventInputSignupPassword: function (event) {
			onInput.call(this, "login_signup_password", event);
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
		eventTapSigninSubmit: function () {
			if (!this.model.isValid({signin: true})) {
				RAD.popup.toast("", this.model.validationError, "warning");
				return;
			}
			let signin = [
				this.model.get("login_signin_email"),
				this.model.get("login_signin_password"),
				response =>
					this.publish("navigation.show", {
						container_id: "#screen",
						content: "screen.menu",
						extras: {
							response,
						},
						animation: "slide-in",
					})
				,
				RAD.popup.toast.server_error,
			];
			RAD.core.publish("service.rest.account_signin", signin);
		},
		eventTapSignupSubmit: function () {
			if (!this.model.isValid({signup: true})) {
				RAD.popup.toast("", this.model.validationError, "warning");
				return;
			}
			let signup = [
				this.model.get("login_signup_fullname"),
				this.model.get("login_signup_email"),
				this.model.get("login_signup_password"),
				response =>
					this.publish("navigation.show", {
						container_id: "#screen",
						content: "screen.menu",
						extras: {
							response,
						},
						animation: "slide-in",
					})
				,
				RAD.popup.toast.server_error,
			];
			RAD.core.publish("service.rest.account_signup", signup);
		}
	}));
});
