"use strict";
define("screen.auth", ["model.account"], function () {
	/**
	 * @class RAD.screen.auth
	 */
	RAD.view("screen.auth", RAD.Blanks.View.extend({
		url: "source/views/screen.auth/screen.auth.ejs",
		/**
		 * @see RAD.model.account
		 */
		model: RAD.model("model.account"),
	}));
});
