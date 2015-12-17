"use strict";
define("collection.quiz", ["model.quiz",], function () {
	/**
	 * @class RAD.coleection.phones
	 */
	RAD.model("collection.quiz", Backbone.Collection.extend({
		/**
		 * @see RAD.model.quiz
		 */
		model: RAD.model("model.quiz"),
		defaults: [
			{
				id: "",
				name: "Nothing to show",
			},
		],
		initialize: function () {
			this.defaults.forEach(
				model => this.add(
					(new (RAD.model("model.quiz"))).set(model)
				)
			);
		}
	}), true);
});
