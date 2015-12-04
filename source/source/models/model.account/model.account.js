"use strict";
define("model.account", ["backbone"], function () {
	let localModel = new Backbone.LocalStorage("model.account");
	let ModelAccount = Backbone.Model.extend({
		localStorage: localModel,
		defaults: {
			first_name: "",
			last_name: "",
			email: "",
			session_id: null,
		},
		initialize: function () {
			this.fetch();
		}
	});
	let modelAccount = new ModelAccount({id: "model.account"});
	/**
	 * @class RAD.model.account
	 */
	RAD.model("model.account", modelAccount);
});
