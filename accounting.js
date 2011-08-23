/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 noexpandtab: */
/*!
 * accounting.js javascript library v0.1.3+
 * https://josscrowcroft.github.com/accounting.js/
 *
 * Copyright 2011 by Joss Crowcroft
 * Licensed under GPL v3 | http://www.gnu.org/licenses/gpl-3.0.txt
 */
var accounting = (function () {
	
	// SETTINGS =======

	/**
	 * The library's settings configuration object
	 * 
	 * Contains defaults for currency and number formatting
	 */
	var settings = {
		currency: {
			symbol : "$",	// default currency symbol is '$'
			format: "%s%v", // this controls string output: %s = symbol, %v = value/number
			decimal : ".",	// decimal point separator
			thousand: ",",	// thousands separator
			precision : 2	// decimal places
		},
		number: {
			precision : 0,	// default precision on numbers is 0
			thousand: ",",
			decimal : "."
		}
	};


	// HELPERS =======

	/**
	 * Check if value is of a certain type, since typeOf isn't reliable (http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/)
	 */
	function isType(val, type){
		return Object.prototype.toString.call(val) === '[object '+ type +']';
	}

	function isArray(val){
		return isType(val, 'Array');
	}

	function isObject(val){
		return isType(val, 'Object');
	}

	/**
	 * Simplified `Array.map()`
	 *
	 * Returns a new Array as a result of calling `fn` on each array value.
	 */
	function map(arr, fn, thisVal){
		var i = 0,
			n = arr.length,
			result = [];
		while(i < n){
			result[i] = fn.call(thisVal, arr[i], i, arr);
			i += 1;
		}
		return result;
	}


	// API ======

	/**
	 * Removes currency formatting from a number or array of numbers, returning numeric values
	 * 
	 * Decimal must be included in the regular expression to match floats (default: ".")
	 * To do: rewrite this to be a little more elegant and maybe throw useful errors.
	 */
	function unformat(number, decimal) {
		var result;

		if ( isArray(number) ) {
			result = map(number, function(val){
				return unformat(val, decimal);
			});
		} else {
			// Fails silently (need decent errors):
			number = number || 0;
			decimal = decimal || '.';
			
			// Build regex to strip out everything except digits, decimal point and minus sign:
			var regex = new RegExp('[^0-9-' + decimal + ']', 'g'),
				unformatted = parseFloat(('' + number).replace(regex, '').replace(decimal, '.'));
			
			// This will fail silently which may cause trouble, let's wait and see:
			result = !isNaN(unformatted) ? unformatted : 0;
		}

		return result;
	}
	
	
	/**
	 * Implementation of toFixed() that treats floats more like decimals
	 * 
	 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present 
	 * problems for accounting- and finance-related software.
	 */
	function toFixed(value, precision) {
		// Default precision (decimal places) is 0:
		precision = !isNaN(precision = Math.abs(precision)) ? precision : 0;
		var power = Math.pow(10, precision);
		
		// Multiply up by precision, round accurately, then divide and use native toFixed():
		return (Math.round(value * power) / power).toFixed(precision);
	}
	
	
	/**
	 * Format a number, with comma-separated thousands and custom precision/decimal places
	 * 
	 * Localise by overriding the precision and thousand / decimal separators
	 * 2nd parameter `precision` can be an object matching `settings.number`
	 */
	function formatNumber(number, precision, thousand, decimal) {
		var result;

		if ( isArray(number) ) {
			result = map(number, function(val){
				return formatNumber(val, precision, thousand, decimal);
			});
		} else {
		
			// Second param precision can be an object matching `settings.number`:
			if ( isObject(precision) ) {
				thousand = precision.thousand;
				decimal = precision.decimal;
				precision = precision.precision;
			}
		
			// Make sure all parameters were set, or use defaults:
			number = toFixed(unformat(number), precision); //limit/add decimal digits
			thousand = thousand ? thousand : settings.number.thousand;
			decimal = decimal ? decimal : settings.number.decimal;
			precision = !isNaN(precision = Math.abs(precision)) ? precision : settings.number.precision;
			
			var parts = new RegExp('^(-?\\d{1,3})((?:\\d{3})+)(?:\\.(\\d{'+ precision +'}))?$').exec( number ); //separate begin [$1], middle [$2] and decimal digits [$3]

			if(parts){ //number >= 1000 || number <= -1000
				result = parts[1] + parts[2].replace(/\d{3}/g, thousand + '$&') + (parts[3] ? decimal + parts[3] : '');
			} else {
				result = number.replace('.', decimal);
			}
		}

		return result;
	}


	/**
	 * Format a number into currency
	 * 
	 * Usage: accounting.formatMoney(number, precision, symbol, thousandsSep, decimalSep, format)
	 * defaults: (0, 2, "$", ",", ".", "%s%v")
	 * 
	 * Localise by overriding the symbol, precision, thousand / decimal separators and format
	 * Second param can be an object matching `settings.currency` which is the easiest way.
	 * 
	 * To do: tidy up the parameters
	 */
	function formatMoney(number, symbol, precision, thousand, decimal, format) {
		
		// Second param can be an object matching `settings.currency`:
		if ( isObject(symbol) ) {
			precision = symbol.precision;
			thousand = symbol.thousand;
			decimal = symbol.decimal;
			format = symbol.format;
			symbol = symbol.symbol;
		}
		
		// Make sure params were set, or use defaults:
		// todo: strikes me as a little bit crufty, even though it works well.
		symbol = symbol ? symbol : settings.currency.symbol;
		precision = !isNaN(precision = Math.abs(precision)) ? precision : settings.currency.precision;
		thousand = thousand ? thousand : settings.currency.thousand;
		decimal = decimal || settings.currency.decimal;
		format = format || settings.currency.format;
		
		// Format the number:
		var formatted = formatNumber(number, precision, thousand, decimal);
		
		// Return with currency symbol added:
		return format.replace('%s', symbol).replace('%v', formatted);
	}
	
	
	/**
	 * Format a list of numbers into an accounting column, padding with whitespace
	 * to line up currency symbols, thousand separators and decimals places
	 * 
	 * List should be an array of numbers
	 * Second parameter can be an object containing keys that match the params
	 * 
	 * Returns array of accouting-formatted number strings of same length
	 * 
	 * NB: `white-space:pre` CSS rule is required on the list container to prevent
	 * browsers from collapsing the whitespace in the output strings.
	 */
	function formatColumn(list, symbol, precision, thousand, decimal) {
		if (!list) {
			return [];
		}
		
		var maxLength = 0,
			formatted = [],
			i;
		
		// Format the list according to options, store the length of the longest string:
		// Performs recursive formatting of nested arrays
		for (i = 0; i < list.length; i++) {
			if (typeof list[i] === "object") {
				// Recursively format columns if list is a multi-dimensional array:
				formatted.push(formatColumn(list[i], symbol, precision, thousand, decimal));
			} else {
				// Format this number, push into formatted list and save the length:
				formatted.push(formatMoney(list[i], symbol, precision, thousand, decimal));
				if (formatted[i].length > maxLength) {
					maxLength = formatted[i].length;
				}
			}
		}
		
		
		// Second param can be an object, but symbol is needed for next part, so get it:
		// tl;dr: `symbol` = default if no symbol set, or else `opts.symbol` if set, or else just `symbol`
		symbol = (!symbol ? settings.currency.symbol : symbol.symbol ? symbol.symbol : symbol);
		
		// Add space between currency symbol and number to pad strings:
		for (i = 0; i < formatted.length; i++) {
			// Only if this is a string (not a nested array):
			if (typeof formatted[i] === "string" && formatted[i].length < maxLength) {
				// Match first number in string and add enough padding:
				formatted[i] = formatted[i].replace(
					/(-?\d+)/,
					(new Array((maxLength - formatted[i].length) + 1).join(" ")) + "$1"
				);
			}
		}
		
		// Send back the list of numbers:			
		return formatted;
	}	
	
	
	// Return the library's API:
	return {
		settings: settings,
		formatMoney: formatMoney,
		formatNumber: formatNumber,
		formatColumn: formatColumn,
		toFixed: toFixed,
		unformat: unformat
	};
}());
