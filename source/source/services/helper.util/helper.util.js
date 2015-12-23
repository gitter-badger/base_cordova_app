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
		/**
		 * @param {*} anything
		 * @return {Object}
		 */
		toObject: function (anything) {
			switch (true) {
				case anything instanceof Map:
					return this.MapToObject(anything);
					break;
				case this.isClass(anything):
					return this.instance(anything);
					break;
				default:
					return {};
					break;
			}
		},
		/**
		 * @param {Map} map
		 * @return {Object}
		 */
		MapToObject: function (map) {
			let object = {};
			map.forEach((value, key) => object[key] = value);
			return object;
		},
		/**
		 * Returns the type of the argument
		 * @param {*} val
		 * @returns {String}
		 */
		getType: function (val) {
			if (typeof val === 'undefined') return 'undefined';
			if (typeof val === 'object' && !val) return 'null';
			return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
		},
		isClass: function (val) {
			let type = this.getType(val);
			if (type !== "function") {
				return false;
			}
			if (type[0] !== "{") {
				return true;
			} else {
				return false;
			}
		}
	};
	/**
	 * @class RAD.helper.util
	 */
	RAD.namespace("helper.util", util);
	_.mixin(util);
});
