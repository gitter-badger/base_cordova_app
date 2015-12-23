"use strict";
define("widget.navigation", [
	"model.navigation",
	"helper.util",
	"service.account",
], function () {

	let onInput = RAD.screen.basic.onInput;

	class WidgetNavigation {
		constructor() {
			this.className = "labaster";
			this.url = "source/views/widget.navigation/widget.navigation.ejs";
			/**
			 * @see RAD.model.navigation
			 */
			this.model = RAD.model("model.navigation");
			this.events = {
				"keyup #login_signin_email": "eventKeyUp",
				"keyup #login_signin_password": "eventKeyUp",
				"tap   #login_signin_submit": "eventTapSigninSubmit",
				//
				"input          #login_signin_email": "eventInputSigninEmail",
				"propertychange #login_signin_email": "eventInputSigninEmail",
				"input          #login_signin_password": "eventInputSigninPassword",
				"propertychange #login_signin_password": "eventInputSigninPassword",
			};
		}

		onStartAttach() {
			this.model.trigger("change");
		}

		onEndAttach () {

		}

		eventInputSigninEmail(event) {
			onInput.call(this, "login_signin_email", event);
		}

		eventInputSigninPassword(event) {
			onInput.call(this, "login_signin_password", event);
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

		eventTapSigninSubmit() {
			if (!this.model.isValid({signin: true})) {
				RAD.popup.toast("", this.model.validationError, "warning");
				return;
			}
			RAD.core.publish("service.rest.account_signin", [
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
			]);
		}
	}
	RAD.view("widget.navigation", RAD.Blanks.View.extend(_.toObject(WidgetNavigation)));
});
