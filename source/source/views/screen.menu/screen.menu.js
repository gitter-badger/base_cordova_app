"use strict";
define("screen.menu", ["collection.quiz",], function () {
	/**
	 * @class RAD.screen.menu
	 */
	RAD.view("screen.menu", RAD.Blanks.View.extend({
		url: "source/views/screen.menu/screen.menu.ejs",
		/**
		 * @see RAD.collection.quiz
		 */
		model: RAD.model("collection.quiz"),
	}));
});
