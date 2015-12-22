"use strict";
define("model.navigation", [
	"helper.translate",
	"helper.util",
	"model.account",
	"model.basic",
	"service.account",
], function () {
	let ModelNavigation = {
		defaults: {
			title: "",
			mode: "login",
			is_session_active: function () {
				return !!RAD.model("model.account").get("accessToken");
			},
			fullName: function () {
				return RAD.model("model.account").get("fullName");
			},
		},
		initialize: function () {
			this.set("title", __("navigation title"));
			RAD.core.publish("service.account.is_active", (error, active) => this.accountEvent(active), "sticky");
			RAD.core.subscribe("service.account.signin", this.accountEvent.bind(this));
			RAD.core.subscribe("service.account.signup", this.accountEvent.bind(this));
			RAD.core.subscribe("service.account.signed_in", this.accountEvent.bind(this));
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
