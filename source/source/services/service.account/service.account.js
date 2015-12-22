"use strict";
define("service.account", [
	"helper.storage",
	"helper.util",
	"service.basic",
], function () {
	let ServiceAccount = {
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
		/**
		 * @param {Function=} callback
		 * @return {boolean}
		 */
		is_active: function (callback) {
			let isActive = !!this.model.get("accessToken");
			if (_.isFunction(callback)) {
				callback(null, isActive);
			} else {
				return isActive;
			}
		},
	};
	/**
	 * @class RAD.service.account
	 */
	RAD.service("service.account", RAD.Blanks.Service.extend(ServiceAccount));
});
