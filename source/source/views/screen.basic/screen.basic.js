"use strict";
define("screen.basic", [], function () {
	/**
	 * @class RAD.screen.basic
	 */
	RAD.namespace("screen.basic", {
		events: {
			"input #input": "onChange",
			"propertychange #input": "onChange",
		},
		onChange: function (event) {
			if ("attribute" in event.currentTarget.attributes === false) {
				return;
			}
			this.model.set(event.currentTarget.attributes.attribute, event.currentTarget.value, {
				silent: true,
			});
		},
		onInput: function (attributeName, event) {
			this.model.set(attributeName, event.currentTarget.value, {
				silent: true,
			});
		},
	});
});

