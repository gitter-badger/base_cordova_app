/**
 * @class service.json_loader
 */
RAD.service("service.json_loader", RAD.Blanks.Service.extend({
	onReceiveMsg: function (channel, data) {
		window.console.log("channel:", channel, "data:", data);
	}
}));