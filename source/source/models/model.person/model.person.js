"use strict";
define("model.person", ["backbone"], function () {
	/**
	 * @class model.person
	 */
	RAD.model("model.person", Backbone.Model.extend({
		defaults: {
			name: "-",
			phone: "-"
		}
	}), false);
});
