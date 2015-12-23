"use strict";
define("screen.login", [
	"helper.fetch",
	"helper.translate",
	"helper.util",
	"model.account",
	"model.login",
	"screen.basic",
], function () {
	let onInput = RAD.screen.basic.onInput;
	class ScreenLogin {
		constructor() {
			this.url = "source/views/screen.login/screen.login.ejs";
			this.className = "override-scroll";
			/**
			 * @see RAD.model.login
			 */
			this.model = RAD.model("model.login");
			this.events = {
				"keyup #login_signup_fullname": "eventKeyUp",
				"keyup #login_signup_email": "eventKeyUp",
				"keyup #login_signup_password": "eventKeyUp",
				"tap   #login_signup_submit": "eventTapSignupSubmit",
				//
				"input          #login_signup_fullname": "eventInputSignupFullname",
				"propertychange #login_signup_fullname": "eventInputSignupFullname",
				"input          #login_signup_email": "eventInputSignupEmail",
				"propertychange #login_signup_email": "eventInputSignupEmail",
				"input          #login_signup_password": "eventInputSignupPassword",
				"propertychange #login_signup_password": "eventInputSignupPassword",
			};
		}

		onStartAttach() {
			this.model.trigger("change");
		}

		eventInputSignupFullname(event) {
			onInput.call(this, "login_signup_fullname", event);
		}

		eventInputSignupEmail(event) {
			onInput.call(this, "login_signup_email", event);
		}

		eventInputSignupPassword(event) {
			onInput.call(this, "login_signup_password", event);
		}

		_jumpToElement(query) {
			this.$(query).trigger("tap").focus();
		}

		eventKeyUp(event) {
			switch (event.keyCode) {
				case 13:
					// Enter
					let jumpFromTo = {
						"login_signin_email": "#login_signin_password",
						"login_signin_password": "#login_signin_submit",
					};
					if (Object.keys(jumpFromTo).includes(event.currentTarget.id)) {
						this._jumpToElement(jumpFromTo[event.currentTarget.id]);
					}
					break;
				case 9:
					// Tab
					break;
			}
		}

		eventTapSignupSubmit() {
			if (!this.model.isValid({signup: true})) {
				RAD.popup.toast("", this.model.validationError, "warning");
				return;
			}
			RAD.core.publish("service.rest.account_signup", [
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
			]);
		}
	}
	/**
	 * @class RAD.screen.login
	 */
	RAD.view("screen.login", RAD.Blanks.ScrollableView.extend(_.toObject(ScreenLogin)));
});
