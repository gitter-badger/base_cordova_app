"use strict";
define("screen.menu", [
	"collection.quiz",
	"helper.util",
], function () {
	class ScreenMenu {
		constructor() {
			this.url = "source/views/screen.menu/screen.menu.ejs";
			this.model = RAD.model("collection.quiz");
			this.className = "override-scroll";
		}

		onEndAttach () {
			console.info("Load quiz now");
		}
	}
	RAD.view("screen.menu", RAD.Blanks.ScrollableView.extend(_.instance(ScreenMenu)));
});
