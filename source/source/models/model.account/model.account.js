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
			this.fetch();
		}
	});
	let modelAccount = new ModelAccount({id: "model.account"});
	/**
	 * @class RAD.model.account
	 */
	RAD.model("model.account", modelAccount);
});
