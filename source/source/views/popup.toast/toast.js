/**
 * @class PopupToast
 */
RAD.view('view.popup_toast', RAD.Blanks.Toast.extend({
	url: 'view/popup/toast/toast.ejs',
	onClose: null,
	events: {
		'tap .toast-frame': 'onDestroy',
		'tap.view.popup_toast': 'onTap',
		'tapdown.view.popup_toast': 'onTap',
		'click.view.popup_toast': 'onTap'
	},
	startOver: false,
	onTap: function () {
		this.onClosing();
		return false; // Stop framework closing on tap
	},
	onClosing: function () {
		setTimeout(this._close.bind(this), 1000);
	},
	/**
	 * @private
	 */
	_close: function () {
		RAD.core.publish('navigation.dialog.close', {
			content: this.viewID || 'view.popup_toast'
		});
	},
	onInitialize: function () {
		this.subscribe('navigation.back', this.onNavigationLeave, this);
		this.subscribe('navigation.show', this.onNavigationLeave, this);
		var Model = Backbone.Model.extend();
		this.model = new Model();
	},
	onDestroy: function () {
		if (_.isFunction(this.onClose)) {
			this.onClose();
			this.onClose = null;
		}
	},
	onNewExtras: function (extras) {
		if (_.isFunction(extras.onStart)) {
			extras.onStart();
		}
		if (_.isFunction(extras.onFinish)) {
			this.onClose = extras.onFinish;
		}
		this.model.set({
			message: extras.message,
			title: extras.title,
			type: extras.type
		});
		this.showTime = extras.showTime;
	},
	onNavigationLeave: function () {
		this.publish('navigation.dialog.close', {
			content: this.viewID
		});
	},
	onStartAttach: function () {
		this.$el.removeClass('outside');
		this.outSideClose = false;
	}
}));
RAD.namespace('toast', function (title, message, type, ttl, onStart, onFinish, gravity) {
		//console.info('RAD.toast(' + message + ')');
		if (!title || title === "" || title === null || title === undefined || title === false || title === 0) {
			title = "";
		}
		if (!['center', 'left', 'right', 'top', 'bottom'].contains(gravity)) {
			gravity = 'center';
		}
		message += '';
		if (message) {
			message.trim();
		}
		title += '';
		if (title) {
			title.trim();
		}
		ttl = perk.num.int(ttl, window.config.toastTTL) * 1000;
		if (!['error', 'message', 'warning', 'info'].contains(type)) {
			type = 'message';
		}
		if (!_.isFunction(onStart)) {
			onStart = new Function;
		}
		if (!_.isFunction(onFinish)) {
			onFinish = new Function;
		}
		var options = {
			content: 'view.popup_toast',
			gravity: gravity,
			extras: {
				message: message,
				onFinish: onFinish,
				onStart: onStart,
				showTime: ttl,
				title: title,
				type: type
			}
		};
		RAD.core.publish('navigation.toast.show', options);
	}
);
/**
 * Show toast
 * @param {String=} title - Title for message
 * @param {String=} message - Display Message
 * @param {String|'error'|'message'|'warning'} type - Message type
 * @param {Number=4} ttl - Time to live in seconds
 * @param {Function=} onStart - Callback function
 * @param {Function=} onFinish - Callback function
 * @param {String|'center'|'left'|'right'|'top'|'bottom'} gravity - Position on screen
 * @example RAD.application.toast('My Title', 'My Message', 'message', 15, function () {// Showed}, function () {// Closed}, 'top');
 */
RAD.toast;
