"use strict";
define("model.account", ["backbone.localStorage",], function () {
	let localModel = new Backbone.LocalStorage("model.account");
	let ModelAccount = Backbone.Model.extend({
		localStorage: localModel,
		defaults: {
			fullName: "",
			email: "",
			accessToken: null,
		},
		initialize: function (attributes, options) {
			this.fetch({
				success: function () {
					RAD.core.publish("service.account.signed_in");
				}
			});
		}
	});
	let modelAccount = new ModelAccount({id: "model.account"});
	/**
	 * @class RAD.model.account
	 */
	RAD.model("model.account", modelAccount);
});
