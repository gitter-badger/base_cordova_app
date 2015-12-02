"use strict";
define("screen.auth", ["model.account"], function () {
	/**
	 * @class screen.auth
	 */
	RAD.view("screen.auth", RAD.Blanks.View.extend({
		url: "source/views/screen.auth/screen.auth.ejs",
		/**
		 * @see collection.phones
		 */
		model: RAD.model("model.account")
	}));
});