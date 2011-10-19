/**
 * accounting-jquery.js [alpha]
 *
 * jQuery plugin wrapper for accounting.js. Dependcies: jQuery, accounting.js (duh)
 * Usage: `$(el).accounting("methodName", [opts]);`
 */

(function($) {
	var methods = {
		settings: function(options) {
			// Merge new options into accounting.settings
			accounting.settings = $.extend(true, accounting.settings, options);

			// Return for chaining
			return this;
		},
		formatNumber: function(options) {
			// Apply accounting.formatNumber() to matched elements and return for chaining
			return this.each(function() {
				$(this).text(
					accounting.formatNumber($(this).text(), options)
				);
			});
		},
		formatMoney: function(options) {
			// Apply accounting.formatMoney() to matched elements and return for chaining
			return this.each(function() {
				$(this).text(
					accounting.formatMoney($(this).text(), options)
				);
			});
		},
		formatColumn: function(options) {
			var column = [];

			// Collect our values into an array to pass to formatColumn()
			this.each(function() {
				column.push($(this).text());
			});

			// Format the column of values
			column = accounting.formatColumn(column, options);

			// Now set each of the elements' values and return for chaining
			return this.each(function(i) {
				$(this).text(column[i]);
			});
		},
		toFixed: function(precision) {
			// Apply accounting.toFixed() to matched elements and return for chaining
			return this.each(function() {
				$(this).text(
					accounting.toFixed($(this).text(), precision)
				);
			});
		},
		unformat: function(decimal) {
			// Apply accounting.unformat() to matched elements and return for chaining
			return this.each(function() {
				$(this).text(
					accounting.unformat($(this).text(), decimal)
				);
			});
		}
	};

	$.fn.accounting = function(method) {
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.settings.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.accounting');
		}
	};
})(jQuery);
