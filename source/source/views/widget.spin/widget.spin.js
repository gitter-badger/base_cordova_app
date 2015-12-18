"use strict";
define("widget.spin", ["backbone",], function () {
	/**
	 * @class RAD.widget.spin
	 * @example
	 * RAD.core.publish("navigation.dialog.show", {
	 *   content: "widget.spin",
	 *   gravity: "center",
	 *   target: "#screen",
	 *   extras: {},
	 * });
	 * RAD.core.subscribe("widget.spin.attach_complete", function () {
	 *  console.info("Spinner on display");
	 * });
	 * RAD.core.subscribe("widget.spin.detach", function () {
	 *  console.info("Spinner removed from display");
	 * });
	 */
	RAD.view("widget.spin", RAD.Blanks.View.extend({
		url: "source/views/widget.spin/widget.spin.ejs",
		onCloseDestroy: true,
		outSideClose: false,
		onInitialize: function () {
			this.subscribe("navigation.back", this.onNavigationLeave);
			this.subscribe("navigation.show", this.onNavigationLeave);
		},
		onNavigationLeave: function () {
			RAD.widget.spin.hide();
		},
	}));
	RAD.namespace("widget.spin", {
		show: function () {
			RAD.core.publish("navigation.dialog.show", {
				content: "widget.spin",
				gravity: "center",
				target: "#screen",
				extras: {},
			});
		},
		hide: function () {
			RAD.core.publish("navigation.dialog.close", {
				content: "widget.spin",
				gravity: "center",
				target: "#screen",
				extras: {},
			});
		}
	});
});

