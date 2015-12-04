"use strict";
define("model.person", ["backbone"], function () {
	/**
	 * @class RAD.model.person
	 */
	RAD.model("model.person", Backbone.Model.extend({
		defaults: {
			name: "-",
			phone: "-"
		}
	}), false);
});
