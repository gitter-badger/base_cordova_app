"use strict";
define("collection.quiz", ["model.quiz",], function () {
	/**
	 * @class RAD.coleection.quiz
	 */
	RAD.model("collection.quiz", Backbone.Collection.extend({
		/**
		 * @see RAD.model.quiz
		 */
		model: RAD.model("model.quiz"),
		defaults: [
			//{
			//	id: "",
			//	name: "Nothing to show",
			//},
		],
		initialize: function (models, options) {
			this.defaults.forEach(
				model => this.add(
					(new (RAD.model("model.quiz"))).set(model)
				)
			);
		},
	}), true);
});
