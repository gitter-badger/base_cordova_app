/**
 * @class PopupDialog
 */
RAD.view('popup_dialog', RAD.Blanks.View.extend({
	url: 'source/source/views/popup.dialog/dialog.ejs',
	events: {
		'tap .dialog-title': 'tapButton'
	},
	onClick: new Function,
	onInitialize: function () {
		this.subscribe('navigation.back', this.onNavigationLeave, this);
		this.subscribe('navigation.show', this.onNavigationLeave, this);
		var Model = Backbone.Model.extend();
		this.model = new Model();
	},
	onNewExtras: function (extras) {
		var cfg = {
			message: extras.message,
			type: extras.type,
			button: [
				{title: __('Cancel')},
				{title: __('OK')}
			]
		};
		if (_.has(extras, 'buttons')) {
			if (_.isArray(extras.buttons)) {
				cfg.button = [];
				extras.buttons.forEach(function (title) {
					cfg.button.push({title: title});
				});
			} else if (_.isObject(extras.buttons)) {
				cfg.button = {};
				_.each(extras.buttons, function (title, index) {
					cfg.button[index] = {title: title};
				});
			}
		}
		if (_.isFunction(extras.onClick)) {
			this.onClick = extras.onClick;
		}
		if (extras.className) {
			this.$el.addClass(extras.className);
		}
		this.model.set(cfg);
	},
	tapButton: function (event) {
		var setId = this.$(event.currentTarget).data('set');
		this.publish('navigation.dialog.close', {
			content: 'view.popup_dialog'
		});
		if (_.isFunction(this.onClick)) {
			this.onClick(setId);
		}
	},
	onNavigationLeave: function () {
		this.publish('navigation.dialog.close', {
			content: this.viewID
		});
	}
}));

/**
 * Show dialog
 * @param {String=} message - Display Message
 * @param {String|'error'|'message'|'warning'} type - Message type
 * @param {Function=} onClick - Callback function
 * @param {Array=} buttons - Buttons
 * @example RAD.dialog('My Title', 'My Message', 'message', 15, function () {// Showed}, function () {// Closed}, 'top');
 */
RAD.dialog = function (message, type, onClick, buttons) {
	message += '';
	if (message) {
		message.trim()
	}
	if (!['error', 'message', 'warning', 'info'].contains(type)) {
		type = 'message';
	}
	var options = {
		content: 'view.popup_dialog',
		gravity: 'center',
		extras: {
			buttons: buttons,
			message: message,
			onClick: onClick,
			type: type
		}
	};
	RAD.core.publish('navigation.dialog.show', options);
};

/**
 * Show dialog to retry internet request
 * @param {Function=} fnOk
 * @param {Function=} fnCancel
 * @param {Function=} onNewAttempt
 * @example RAD.dialogRetry(function () {}, function () {})
 */
RAD.dialogRetry = function (fnOk, fnCancel, onNewAttempt) {
	RAD.application.preloaderHide();
	!_.isFunction(fnOk) && (fnOk = new Function);
	!_.isFunction(fnCancel) && (fnCancel = new Function);
	!_.isFunction(onNewAttempt) && (onNewAttempt = new Function);
	RAD.dialog(/*t("Connection timed out") + ".<br>" + */t("Try again?"), "info", function (buttonIndex) {
		if (buttonIndex === 1) {
			RAD.application.preloaderShow();
			fnOk();
			onNewAttempt();
		} else {
			fnCancel();
		}
	}, [__("NO").toUpperCase(), __("YES").toUpperCase()]);
};
