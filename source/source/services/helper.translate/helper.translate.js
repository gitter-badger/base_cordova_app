"use strict";
define("helper.translate", ["model.settings"], function () {
	let translations = {
		
	};
	function translate(text) {
		if (text in translations === false) {
			return text;
		}
		//
		let language = RAD.model("settings").get("language");
		if (language in translations[text] === false) {
			return text;
		}
		return translations[text][language];
	}
	/**
	 * @class RAD.helper.translate
	 */
	RAD.namespace("helper.translate", translate);
});
