"use strict";
define("helper.translate", ["helper.settings", "string"], function () {
	let translations = {
		"cancel": {
			"en": "cancel",
			"ru": "отмена",
			"ua": "вiдмiна",
		},
		"ok": {
			"en": "ок",
			"ru": "хорошо",
			"ua": "добре",
		},
		"sign in": {
			"en": "sign in",
			"ru": "войти",
			"ua": "увiйти",
		},
		"password": {
			"en": "password",
			"ru": "пароль",
			"ua": "пароль",
		},
		"email": {
			"en": "email",
			"ru": "email",
			"ua": "email",
		},
		"sign up": {
			"en": "register",
			"ru": "зарегистрироваться",
			"ua": "зареєструватися",
		},
		"fullname": {
			"en": "full name",
			"ru": "полное имя",
			"ua": "повне ім'я",
		},
	};

	function translate(text, mode) {
		if (text in translations === false) {
			return "{{" + text + "}}";
		}
		//
		let language = RAD.helper.settings.language;
		if (language in translations[text] === false) {
			return "{{" + text + "}}";
		}
		text = translations[text][language];
		if (arguments.length < 2) {
			mode = 2;
		} else {
			mode = 0;
		}
		switch (mode) {
			case 1:
				text = S(text).capitalize().s;
				break;
			case 2:
				text = text.replace(/(?:^|\s)\S/g, function (str) {
					return S(str).capitalize().s;
				});
				break;
			case 3:
				text = text.toUpperCase();
				break;
			case 4:
				text = text.toLowerCase();
				break;
			case 5:
				text = S(text).humanize().s;
				break;
		}
		return text;
	}

	translate.AS_IS = 0;
	translate.PARAGRAPH = 1;
	translate.CAPITALIZE = 2;
	translate.UPPERCASE = 3;
	translate.LOWERCASE = 4;
	translate.HUMANIZE = 5;
	/**
	 * @class RAD.helper.translate
	 */
	RAD.namespace("helper.translate", translate);
	/**
	 * @type {Function}
	 * @param {string} text
	 * @param {number=2} mode
	 * @return {string}
	 */
	window.__ = translate;
});
