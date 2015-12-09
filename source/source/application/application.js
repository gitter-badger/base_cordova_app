"use strict";
define("application", [], function () {
	RAD.application(function (core) {
		var app = this;
		app.start = function () {
			function onDeviceReady() {
				core.startAll();
				let accessToken = RAD.model("model.account").get("accessToken");
				if (accessToken) {
					core.publish("navigation.show", {
						container_id: "#screen",
						content: "screen.home",
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
