"use strict";
define("widget.navigation", [
	"model.navigation",
	"helper.util",
	"service.account",
], function () {
	class WidgetNavigation {
		constructor() {
			this.className = "labaster";
			this.url = "source/views/widget.navigation/widget.navigation.ejs";
			this.model = RAD.model("model.navigation");
		}

		onEndAttach () {
			console.info("onEndAttach");
		}
	}
	RAD.view("widget.navigation", RAD.Blanks.View.extend(_.instance(WidgetNavigation)));
});
