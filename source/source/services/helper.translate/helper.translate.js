"use strict";
define("helper.translate", ["helper.settings"], function () {
	let translations = {
		"cancel": {
			"en": "Cancel",
			"ru": "Отмена",
			"ua": "",
		},
		"ok": {
			"en": "OK",
			"ru": "Хорошо",
			"ua": "",
		},
	};
	function translate(text) {
		if (text in translations === false) {
			return text;
		}
		//
		let language = RAD.helper.settings.language;
		if (language in translations[text] === false) {
			return text;
		}
		return translations[text][language];
	}
	/**
	 * @class RAD.helper.translate
	 */
	RAD.namespace("helper.translate", translate);
	window.__ = translate;
});
