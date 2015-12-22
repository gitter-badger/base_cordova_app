"use strict";
define("model.navigation", [
	"helper.translate",
	"helper.util",
	"model.basic",
	"service.account",
], function () {
	let ModelNavigation = {
		defaults: {
			title: "",
			mode: "login",
			is_session_active: function () {
				return RAD.core.getService("service.account").is_active();
			},
		},
		initialize: function () {
			this.set("title", __("navigation title"));
			RAD.core.publish("service.account.is_active", this.accountEvent.bind(this, null));
			RAD.core.subscribe("service.account.signin", this.accountEvent.bind(this));
			RAD.core.subscribe("service.account.signup", this.accountEvent.bind(this));
		},
		get: function (attrName) {
			return _.getResult(Backbone.Model.prototype.get.call(this, attrName), this);
		},
		/**
		 * @override Backbone.Model.prototype.toJSON
		 */
		toJSON: RAD.model("model.basic").toJSON(),
		accountEvent: function (active) {
			if (active) {
				this.set("mode", "active");
			} else {
				this.set("mode", "login");
			}
		}
	};
	/**
	 * @class RAD.model.navigation
	 */
	RAD.model("model.navigation", Backbone.Model.extend(ModelNavigation), true);
});
