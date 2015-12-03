"use strict";
define("service.account", ["service.basic"], function () {
	/**
	 * @class RAD.service.account
	 */
	RAD.service("service.account", RAD.Blanks.Service.extend({
		onReceiveMsg: RAD.core.getService("service.basic").onReceiveMsg,
		model: RAD.model("model.account"),
		auth_new: function (authData) {
			this.model.set(_.pick(authData, Object.keys(this.model.attributes)));
		}
	}));
});
