"use strict";
define("helper.storage", ["localforage",], function () {
	window.localforage.config({
		driver: window.localforage.LOCALSTORAGE,
		name: "BaseCordovaExample",
		version: 1.0,
		size: 4980736,
		storeName: "base_cordova_example",
		description: "description",
	});
	/**
	 * @class RAD.helper.storage
	 */
	RAD.namespace("helper.storage", {
		get: function (key, onSuccess, onError, onComplete) {
			localforage.getItem(key, function (error, result) {
				if (_.isFunction(onComplete)) {
					onComplete(error, result);
				}
				if (error) {
					if (_.isFunction(onError)) {
						onError(error);
					}
				} else {
					if (_.isFunction(onSuccess)) {
						onSuccess(result);
					}
				}
			});
		},
		set: function (key, value, onSuccess, onError, onComplete) {
			localforage.setItem(key, value, function (error, result) {
				if (_.isFunction(onComplete)) {
					onComplete(error, result);
				}
				if (error) {
					if (_.isFunction(onError)) {
						onError(error);
					}
				} else {
					if (_.isFunction(onSuccess)) {
						onSuccess(result);
					}
				}
			});
		},
		keys: function (onSuccess, onError, onComplete) {
			localforage.keys(function (error, keys) {
				if (_.isFunction(onComplete)) {
					onComplete(error, keys);
				}
				if (error) {
					if (_.isFunction(onError)) {
						onError(error);
					}
				} else {
					if (_.isFunction(onSuccess)) {
						onSuccess(keys);
					}
				}
			});
		},
		has: function (key, onSuccess, onError, onComplete) {
			this.keys(function (keys) {
				return key in keys;
			}, onError, function (error, keys) {
				onComplete(error, keys && key in keys);
			});
		},
		remove: function (key, onSuccess, onError, onComplete) {
			localforage.removeItem(key, function (error) {
				if (_.isFunction(onComplete)) {
					onComplete(error);
				}
				if (error) {
					if (_.isFunction(onError)) {
						onError(error);
					}
				} else {
					if (_.isFunction(onSuccess)) {
						onSuccess();
					}
				}
			});
		},
		clear: function (onSuccess, onError, onComplete) {
			localforage.clear(function (error) {
				if (_.isFunction(onComplete)) {
					onComplete(error);
				}
				if (error) {
					if (_.isFunction(onError)) {
						onError(error);
					}
				} else {
					if (_.isFunction(onSuccess)) {
						onSuccess();
					}
				}
			});
		},
		iterate: function (iterator, onError) {
			localforage.iterate(iterator, onError);
		}
	});
});

