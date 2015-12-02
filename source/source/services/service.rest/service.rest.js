"use strict";
/**
 * @class service.rest
 */
RAD.service("service.rest", RAD.Blanks.Service.extend({
	onReceiveMsg: function (channel, data) {
		window.console.log("channel:", channel, "data:", data);
	}
}));