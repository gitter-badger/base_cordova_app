"use strict";
define("screen.login", ["model.account", "screen.basic"], function () {
	RAD.model("model.login", Backbone.Model.extend({
		defaults: {
			"signin-email": "",
			"signin-password": "",
		},
		validate: function () {
			if (!this.get("signin-email") && !this.get("register-email")) {
				return __("Please fill email field");
			}
			if (!this.get("signin-password") && !this.get("register-password")) {
				return __("Please fill password field");
			}
			if (this.get("register-password") && this.get("register-email")) {
				let rName = [/^[a-zA-Z_@.!#$%&'*]{1,30}$/, /[.*]{1,255}/][1];
				if (!rName.test(this.get("register-name"))) {
					return __("Please fill name field");
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
			"keyup #login-singnin-email": "eventKeyUp",
			"tap #login-singnin-submit": "eventTapSingninSubmit",
			"input #email": "eventInputEmail",
			"propertychange #email": "eventInputEmail",
		},
		onStartAttach: function () {
			this.model.trigger("change");
		},
		eventInputEmail: function (event) {
			RAD.screen.basic.onInput.call(this, "email", event);
		},
		eventKeyUp: function (event) {
			switch (event.keyCode) {
				case 13:
					// Enter
					switch (event.currentTarget.id) {
						case "login-singnin-email":
							let $password = this.$("#login-singnin-password");
							$password.trigger("tap");
							$password.focus();
							break;
						case "login-singnin-password":
							let $loginSubmit = this.$("#login-singnin-submit");
							$loginSubmit.focus();
							$loginSubmit.trigger("tap");
							break;
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

