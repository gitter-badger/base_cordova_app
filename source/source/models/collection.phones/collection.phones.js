"use strict";
define("collection.phones", ["model.person"], function () {
	/**
	 * @class RAD.coleection.phones
	 */
	RAD.model("collection.phones", Backbone.Collection.extend({
		/**
		 * @see RAD.model.person
		 */
		model: RAD.model("model.person"),
		defaults: [
			{
				name: "Rasmus Lerdorf",
				phone: "555-111-222",
			},
			{
				name: "Phil Sturgeon",
				phone: "555-222-333",
			},
			{
				name: "Davey Shafik",
				phone: "555-333-444",
			},
		],
		initialize: function () {
			this.defaults.forEach(
				model => this.add(
					(new (RAD.model("model.person"))).set(model)
				)
			);
		}
	}), true);
});
