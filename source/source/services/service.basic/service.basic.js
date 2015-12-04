"use strict";
define("service.basic", [], function () {
	/**
	 * @class RAD.service.basic
	 */
	RAD.service("service.basic", {
		/**
		 * @param {String} channel
		 * @param {*=} data
		 */
		onReceiveMsg: function (channel, data) {
			//window.console.info("channel:", channel, "data:", data);
			let chunks = channel.split(".");
			if ((2 in chunks) && (chunks[2] in this) && _.isFunction(this[chunks[2]])) {
				if (Array.isArray(data)) {
					this[chunks[2]](...data);
				} else {
					this[chunks[2]](data);
				}
			}
		}
	});
});
