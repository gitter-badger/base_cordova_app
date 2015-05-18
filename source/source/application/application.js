RAD.application(function (core) {
	var app = this;
	app.start = function () {
		function onDeviceReady () {
			core.publish("navigation.show", {
				container_id: "#screen",
				content: "screen.home",
				animation: "none"
			});
		}
		if (window["_cordovaNative"]) {
			document.addEventListener("deviceready", onDeviceReady, false);
		} else {
			onDeviceReady();
		}
	};
	return app;
}, true);