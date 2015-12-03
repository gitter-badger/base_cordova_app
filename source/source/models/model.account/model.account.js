"use strict";
define("model.account", ["backbone"], function () {
	/**
	 * @class RAD.model.account
	 */
	RAD.model("model.account", Backbone.Model.extend({
		defaults: {
			first_name: "",
			last_name: "",
			email: "",
			session_id: null,
		}
	}), true);
});
