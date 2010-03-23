/*
 * jQuery UI Contrib Button @VERSION
 *
 * Copyright (c) 2009 AUTHORS.txt
 * (http://code.google.com/p/jqueryui-contrib/wiki/About)
 * Licensed under the MIT (MIT-LICENSE.txt)
 *
 * http://code.google.com/p/jqueryui-contrib/wiki/docbutton
 *
 * Depends:
 *	ui.core.js
 */

(function($) {
	
$.widget("ui.button", {

	_init: function() {
		var self = this,
			options = this.options;

		this.element.addClass("ui-widget ui-widget-container ui-button ui-helper-clearfix");
		if(options.tooltip != "") {
			this.oldTitle = this.element.attr("title");
			this.element.attr("title", options.tooltip);
		}
		
		this.button = $("<a></a>")
			.addClass("ui-state-default ui-corner-all")
			.click(function() { self.click() })
			.hover(
				function() { $(this).addClass("ui-state-hover"); },
				function() { $(this).removeClass("ui-state-hover"); }
			)
			.mousedown(function() { $(this).addClass("ui-state-active") })
			.mouseup(function() { $(this).removeClass("ui-state-active") })
			.html(options.text)
			.appendTo(this.element);

		this.icon = $("<span></span>")
			.addClass("ui-icon")
			.prependTo(this.button);

		this._setIcon(options.icon)
	},

	destroy: function() {
		this.element.removeClass("ui-widget ui-widget-container ui-button ui-helper-clearfix")
			.attr("title", this.oldTitle);
		this.button.remove();
	},

	click: function() {
		var self = this,
			options = this.options;
		options.click.apply(self.element[0], arguments);
	},

	_setIcon: function(icon) {
		if(icon != "")
			this.icon.addClass(icon);
		else
			this.icon.hide();
	},

	_setData: function(key, value) {
		switch(key) {
			case 'icon':
				this.icon.removeClass(this.options.icon);
				this._setIcon(value);
				break;
			case 'text':
				this.button.html(value);
				this.icon.prependTo(this.button);
				break;
			case 'tooltip':
				this.element.attr("title", value);
				break;
		}
		$.widget.prototype._setData.apply(this, arguments);
	}
});

$.extend($.ui.button, {
	version: "@VERSION",
	defaults: {
		icon: "",
		text: "",
		tooltip: "",
		click: function() {}
	}
});

})(jQuery);
