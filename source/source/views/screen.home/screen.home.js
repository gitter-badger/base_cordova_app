"use strict";
define("screen.home", ["collection.phones"], function () {
	/**
	 * @class RAD.view.screen.home
	 */
	RAD.view("screen.home", RAD.Blanks.View.extend({
		url: "source/views/screen.home/screen.home.ejs",
		/**
		 * @see RAD.collection.phones
		 */
		model: RAD.model("collection.phones"),
	}));
});

