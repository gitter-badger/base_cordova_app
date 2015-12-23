"use strict";
define("screen.menu", [
	"collection.quiz",
	"helper.util",
], function () {
	class ScreenMenu {
		constructor() {
			this.url = "source/views/screen.menu/screen.menu.ejs";
			/** @see RAD.coleection.quiz */
			this.model = RAD.model("collection.quiz");
			this.className = "override-scroll";
			this.events = {
				"tap #menu_refresh_list": "eventTapRefreshList",
			};
		}

		onEndAttach() {
			this.collectionFetch();
		}

		eventTapRefreshList() {
			this.collectionFetch();
		}

		collectionFetch() {
			let timerId = _.delay(RAD.widget.spin.show, 1000);
			this.publish("service.rest.quiz_list", [
				response => this.model.set(response.data),
				RAD.popup.toast.server_error,
				() => {
					clearTimeout(timerId);
					RAD.widget.spin.hide();
				}
			]);
		}
	}
	RAD.view("screen.menu", RAD.Blanks.ScrollableView.extend(_.toObject(ScreenMenu)));
});
