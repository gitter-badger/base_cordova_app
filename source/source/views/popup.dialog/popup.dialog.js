"use strict";
define("popup.dialog", [
	"backbone",
	"helper.translate",
	"underscore",
], function () {
	/**
	 * @class RAD.popup.dialog
	 */
	RAD.view("popup.dialog", RAD.Blanks.View.extend({
		url: "source/views/popup.dialog/popup.dialog.ejs",
		events: {
			"tap .dialog-title": "tapButton",
		},
		onClick: new Function,
		onInitialize: function () {
			this.subscribe("navigation.back", this.onNavigationLeave, this);
			this.subscribe("navigation.show", this.onNavigationLeave, this);
			var Model = Backbone.Model.extend();
			this.model = new Model();
		},
		onNewExtras: function (extras) {
			var cfg = {
				message: extras.message,
				type: extras.type,
				button: [
					{title: RAD.helper.translate("cancel")},
					{title: RAD.helper.translate("ok")}
				]
			};
			if (_.has(extras, "buttons")) {
				if (_.isArray(extras.buttons)) {
					cfg.button = [];
					extras.buttons.forEach(function (title) {
						cfg.button.push({title: title});
					});
				} else if (_.isObject(extras.buttons)) {
					cfg.button = {};
					_.each(extras.buttons, function (title, index) {
						cfg.button[index] = {title: title};
					});
				}
			}
			if (_.isFunction(extras.onClick)) {
				this.onClick = extras.onClick;
			}
			if (extras.className) {
				this.$el.addClass(extras.className);
			}
			this.model.set(cfg);
		},
		tapButton: function (event) {
			var setId = this.$(event.currentTarget).data("set");
			this.publish("navigation.dialog.close", {
				content: "popup.dialog",
			});
			if (_.isFunction(this.onClick)) {
				this.onClick(setId);
			}
		},
		onNavigationLeave: function () {
			this.publish("navigation.dialog.close", {
				content: this.viewID || "popup.dialog",
			});
		}
	}));
	/**
	 * Show dialog
	 * @param {String=} message - Display Message
	 * @param {String|"error"|"message"|"warning"} type - Message type
	 * @param {Function=} onClick - Callback function
	 * @param {Array=} buttons - Buttons
	 * @example RAD.popup.dialog("My Title", "My Message", "message", 15, new Function, new Function, "center");
	 */
	RAD.namespace("popup.dialog", function (message, type, onClick, buttons) {
		message += "";
		if (message) {
			message.trim();
		}
		if (!["error", "message", "warning", "info"].includes(type)) {
			type = "message";
		}
		var options = {
			content: "popup.dialog",
			gravity: "center",
			extras: {
				buttons: buttons,
				message: message,
				onClick: onClick,
				type: type,
			},
		};
		RAD.core.publish("navigation.dialog.show", options);
	});
});
