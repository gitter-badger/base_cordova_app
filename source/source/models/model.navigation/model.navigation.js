"use strict";
define("model.navigation", [
	"service.account",
], function () {
	/**
	 * @class RAD.model.navigation
	 */
	RAD.model("model.navigation", Backbone.Model.extend({
		defaults: {

		},
		onInitialize: function() {
			console.warn("onInitialize");
		}
	}), true);
});
