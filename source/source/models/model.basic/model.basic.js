"use strict";
define("model.basic", ["backbone",], function () {
	let ModelBasic = {
		/**
		 * @override Backbone.Model.prototype.toJSON
		 */
		toJSON: function () {
			return function () {
				return _.mapObject(
					Backbone.Model.prototype.toJSON.apply(this, arguments),
					value => _.getResult(value, this)
				);
			};
		},
	};
	/**
	 * @class RAD.model.account
	 */
	RAD.model("model.basic", ModelBasic, false);
});
