"use strict";
define("service.account", ["helper.storage", "service.basic",], function () {
	/**
	 * @class RAD.service.account
	 */
	RAD.service("service.account", RAD.Blanks.Service.extend({
		onReceiveMsg: RAD.core.getService("service.basic").onReceiveMsg,
		model: RAD.model("model.account"),
		/**
		 * Event when new authorization emitted
		 * @param {Object} authData
		 */
		signin: function (authData) {
			let attrs = _.pick(authData, Object.keys(this.model.attributes));
			this.model.set(attrs);
			this.model.save();
		},
		/**
		 * Event when new registration emitted
		 * @param {Object} authData
		 */
		signup: function (authData) {
			let attrs = _.pick(authData, Object.keys(this.model.attributes));
			this.model.set(attrs);
			this.model.save();
		},
	}));
});
