"use strict";
define("helper.util", [], function () {
	/**
	 * @class RAD.helper.util
	 */
	RAD.namespace("helper.util", {
		validate: {
			notEmpty: function (string) {
				return string && _.isString(string) && string.length;
			},
			email: function (string) {
				if (!this.notEmpty(string)) {
					return false;
				}
				return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string);
			},
			fullName: function (string) {
				if (!this.notEmpty(string)) {
					return false;
				}
				return /^[a-zA-Zа-яА-Я_\s]{1,30}$/.test(string);
			}
		}
	});
});
