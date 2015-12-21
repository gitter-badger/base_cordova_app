"use strict";
define("screen.menu", [
	"collection.quiz",
	"helper.util",
], function () {
	class ScreenMenu {
		constructor() {
			this.url = "source/views/screen.menu/screen.menu.ejs";
			this.model = RAD.model("collection.quiz");
		}
	}
	RAD.view("screen.menu", RAD.Blanks.View.extend(_.instance(ScreenMenu)));
});
