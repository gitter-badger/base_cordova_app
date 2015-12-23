"use strict";
define("helper.translate", [
	"helper.settings",
	"string",
], function () {
	let translations = {
		"": {
			"en": "",
			"ru": "",
			"ua": "",
		},
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
		"please fill email field": {
			"en": "please fill email field",
			"ru": "пожалуйста, заполните поле email",
			"ua": "будь ласка, заповніть поле email",
		},
		"please fill password field": {
			"en": "please fill password field",
			"ru": "пожалуйста, заполните поле пароля",
			"ua": "будь ласка, заповніть поле пароля",
		},
		"please fill full name field": {
			"en": "please fill full name field",
			"ru": "пожалуйста, укажите ваше полное имя",
			"ua": "будь ласка, вкажіть ваше повне ім'я",
		},
		"email field is incorrect": {
			"en": "email field is incorrect",
			"ru": "введен некорректный email",
			"ua": "введений некоректний email",
		},
		"err_internet_desconnected": {
			"en": "server does not respond",
			"ru": "сервер не отвечает",
			"ua": "сервер не відповідає",
		},
		"err_internet_timeout": {
			"en": "the server has timed out",
			"ru": "вышло время ожидания сервера",
			"ua": "вийшов час очікування сервера",
		},
		"navigation title": {
			"en": "MobiDev tests",
			"ru": "MobiDev тесты",
			"ua": "MobiDev тести",
		},
		"login header": {
			"en": "Account Registration",
			"ru": "Регистрация Аккаунта",
			"ua": "Реєстрація Аккаунта",
		},
		"login welcome": {
			"en": `MobiDev is a fast-growing IT software development company with offices in Atlanta (US) and Wurzburg (Germany), and development centers in Kharkiv, Mariupol, Mykolaiv and Chernivtsi. We are oriented to deliver high quality projects and to establish long-term cooperation with product owners.
We are greatly focused on the result. We select a methodology according to the project and our customer’s needs. Agile-driven management methodologies if needed. We use quality control on each step of development: from building requirements to the deployment of the product.`,
			"ru": `MobiDev является быстро растущей ИТ-разработчик программного обеспечения с офисами в Атланте (США) и Вюрцбурге (Германия), и центры развития в Харькове, Мариуполе, Николаеве и Черновцах. Мы ориентированы на реализации проектов высокого качества и установить долгосрочное сотрудничество с владельцами продукта.
Мы очень ориентированы на результат. Мы выбираем методику в соответствии с проектом и потребностей наших клиентов. Agile методологии приводом управления, если требуется. Мы используем контроль качества на каждом этапе развития: от создания требования к развертыванию продукта.`,
			"ua": `MobiDev є швидко зростаючої ІТ-розробник програмного забезпечення з офісами в Атланті (США) і Вюрцбурзі (Німеччина), і центри розвитку в Харкові, Маріуполі, Миколаєві та Чернівцях. Ми орієнтовані на реалізації проектів високої якості і встановити довгострокове співробітництво з власниками продукту.
Ми дуже орієнтовані на результат. Ми вибираємо методику відповідно до проекту і потреб наших клієнтів. Agile методології приводом управління, якщо потрібно. Ми використовуємо контроль якості на кожному етапі розвитку: від створення вимоги до розгортання продукту.`,
		},
		"err_server_wrong": {
			"en": "wrong server response",
			"ru": "неверный ответ сервера",
			"ua": "невірна відповідь сервера",
		},
		"refresh list": {
			"en": "refresh list",
			"ru": "обновить список",
			"ua": "оновити список",
		},
		"there is no quiz": {
			"en": "there is no quiz to pass",
			"ru": "нет тестов для прохождения",
			"ua": "немає тестів для проходження",
		},
	};

	function translate(text, mode) {
		if (text in translations === false) {
			text = text.toLowerCase();
			if (text in translations === false) {
				return text;
			}
		}
		let language = RAD.helper.settings.language;
		if (language in translations[text] === false) {
			return text;
		}
		text = translations[text][language];
		if (arguments.length < 2) {
			mode = 2;
		} else {
			mode = 0;
		}
		switch (mode) {
			case translate.PARAGRAPH:
				text = S(text).capitalize().s;
				break;
			case translate.CAPITALIZE:
				text = text.replace(/(?:^|\s)\S/g, string => S(string).capitalize().s);
				break;
			case translate.UPPERCASE:
				text = text.toUpperCase();
				break;
			case translate.LOWERCASE:
				text = text.toLowerCase();
				break;
			case translate.HUMANIZE:
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
