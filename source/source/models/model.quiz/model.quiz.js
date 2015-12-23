"use strict";
define("model.quiz", ["backbone",], function () {
	/**
	 * @class RAD.model.quiz
	 */
	RAD.model("model.quiz", Backbone.Model.extend({
		defaults: {
			quizId: "",
			name: "",
		}
	}), false);
});
