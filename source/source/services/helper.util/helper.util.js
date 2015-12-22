"use strict";
define("helper.util", ["underscore",], function () {
	let util = {
		execute: function (closure, args = [], context = undefined) {
			if (typeof closure === "function") {
				closure.apply(context, args);
			}
		},
		validate: {
			notEmpty: function (string) {
				return string && _.isString(string) && string.length;
			},
			email: function (string) {
				if (!this.notEmpty(string)) {
					return false;
				}
				return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					.test(string);
			},
			fullName: function (string) {
				if (!this.notEmpty(string)) {
					return false;
				}
				return /^[a-zA-Zа-яА-Я_\s]{1,30}$/.test(string);
			}
		},
		/**
		 * Create object instance with methods defined as properties.
		 * @param {Class|Function} Constructor
		 * @return {Object}
		 */
		instance: function (Constructor) {
			let instance = new Constructor;
			let obj = {};
			Reflect.ownKeys(instance)
				.forEach(name => obj[name] = instance[name]);
			Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
				.forEach(function (name) {
					if (!(instance[name] instanceof Function) || instance[name] === Constructor) { // skip constructor
						return;
					}
					obj[name] = instance[name];
				});
			return obj;
		},
		getResult: function (variable, context) {
			if (_.isFunction(variable)) {
				return variable.call(context);
			} else {
				return variable;
			}
		},
	};
	/**
	 * @class RAD.helper.util
	 */
	RAD.namespace("helper.util", util);
	_.mixin(util);
});
