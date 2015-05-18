define("screen.home", ["collection.phones"], function () {
	/**
	 * @class screen.home
	 */
	RAD.view("screen.home", RAD.Blanks.View.extend({
		url: "source/views/screen.home/screen.home.html",
		/**
		 * @see collection.phones
		 */
		model: RAD.model("collection.phones")
	}));
});