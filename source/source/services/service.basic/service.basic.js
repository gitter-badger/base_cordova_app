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
			channel = channel.split(".");
			if (
				2 in channel
				&& channel[2] in this
				&& _.isFunction(this[channel[2]])
			) {
				if (Array.isArray(data)) {
					this[channel[2]](...data);
				} else {
					this[channel[2]](data);
				}
			}
		}
	});
});
