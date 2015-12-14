"use strict";
define("popup.toast", ["backbone"], function () {
	/**
	 * @class RAD.popup.toast
	 */
	RAD.view("popup.toast", RAD.Blanks.View.extend({
		url: "source/views/popup.toast/popup.toast.ejs",
		className: "toast",
		onClose: null,
		events: {
			"tap .toast-frame": "onTap",
			"tapdown .toast-frame": "onTap",
			"click .toast-frame": "onTap",
		},
		startOver: false,
		onTap: function () {
			console.info("TAP");
			this.onClosing();
			return false; // Stop framework closing on tap
		},
		onClosing: function () {
			console.dir("onClosing");
			setTimeout(this._close.bind(this), 1);
		},
		/**
		 * @private
		 */
		_close: function () {
			console.info(this.viewID);
			this.publish("navigation.dialog.close", {
				content: this.viewID,
			});
		},
		onInitialize: function () {
			this.subscribe("navigation.back", this.onNavigationLeave, this);
			this.subscribe("navigation.show", this.onNavigationLeave, this);
			var Model = Backbone.Model.extend();
			this.model = new Model();
		},
		onDestroy: function () {
			if (_.isFunction(this.onClose)) {
				this.onClose();
				this.onClose = null;
			}
		},
		onNewExtras: function (extras) {
			if (_.isFunction(extras.onStart)) {
				extras.onStart();
			}
			if (_.isFunction(extras.onFinish)) {
				this.onClose = extras.onFinish;
			}
			this.model.set({
				message: extras.message,
				title: extras.title,
				type: extras.type,
			});
			this.showTime = extras.showTime;
		},
		onNavigationLeave: function () {
			//this.publish("navigation.toast.close", {
			//	content: this.viewID,
			//});
		},
		onStartAttach: function () {
			//this.$el.removeClass("outside");
			//this.outSideClose = false;
		}
	}));
	/**
	 * @class RAD.toast
	 * @param {String=} title - Title for message
	 * @param {String=} message - Display Message
	 * @param {String|"error"|"message"|"warning"} type - Message type
	 * @param {Number=4} ttl - Time to live in seconds
	 * @param {Function=} onStart - Callback function
	 * @param {Function=} onFinish - Callback function
	 * @param {String|"center"|"left"|"right"|"top"|"bottom"} gravity - Position on screen
	 * @example RAD.popup.toast("TITLE", "TEXT", "success", 9999999, new Function, new Function, "center");
	 */
	RAD.namespace("popup.toast", function (title, message, type, ttl, onStart, onFinish, gravity) {
			if (!title || title === "" || title === null || title === undefined || title === false || title === 0) {
				title = "";
			}
			if (!["center", "left", "right", "top", "bottom"].includes(gravity)) {
				gravity = "center";
			}
			message += "";
			if (message) {
				message.trim();
			}
			title += "";
			if (title) {
				title.trim();
			}
			ttl = 1000;
			if (!["error", "message", "warning", "info"].includes(type)) {
				type = "message";
			}
			if (!_.isFunction(onStart)) {
				onStart = new Function;
			}
			if (!_.isFunction(onFinish)) {
				onFinish = new Function;
			}
			var options = {
				content: "popup.toast",
				outsideClose: true,
				gravity: gravity,
				showTime: ttl,
				extras: {
					message: message,
					onFinish: onFinish,
					onStart: onStart,
					showTime: ttl,
					title: title,
					type: type,
				}
			};
			RAD.core.publish("navigation.toast.show", options);
		}
	);
});
