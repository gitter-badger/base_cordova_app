"use strict";
define("application", [], function () {
	RAD.application(function (core) {
		let app = this;
		app.start = function () {
			function onDeviceReady() {
				core.startAll();
				core.publish("navigation.show", {
					container_id: "#navigation",
					content: "widget.navigation",
					animation: "none",
				});
				let accessToken = RAD.model("model.account").get("accessToken");
				if (accessToken) {
					core.publish("navigation.show", {
						container_id: "#screen",
						content: "screen.menu",
						animation: "none",
					});
				} else {
					core.publish("navigation.show", {
						container_id: "#screen",
						content: "screen.login",
						animation: "none",
					});
				}
			}

			if (window["cordova"]) {
				document.addEventListener("deviceready", onDeviceReady, false);
			} else {
				onDeviceReady();
			}
		};
		return app;
	}, true);
});
