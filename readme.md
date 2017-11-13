**accounting.js** is a tiny JavaScript library for number, money and currency parsing/formatting. It's lightweight, fully localisable, has no dependencies, and works great client-side or server-side. Use standalone or as a nodeJS/npm and AMD/requireJS module.

Visit the plugin homepage for demos and documentation: **http://openexchangerates.github.io/accounting.js/**

Please checkout or download the latest stable tag before using in production. [Bug reports](https://github.com/openexchangerates/accounting.js/issues) and pull requests are welcome.

Maintained by [Open Exchange Rates](https://openexchangerates.org "Free reliable exchange rates/currency conversion data API") and originally by [@josscrowcroft](http://twitter.com/josscrowcroft) and other [contributors](https://github.com/openexchangerates/accounting.js/contributors).

---

### Works great with:

* **[money.js](http://openexchangerates.github.com/money.js "JavaScript and NodeJS Currency Conversion Library")** - a tiny (1kb) standalone JavaScript currency conversion library, for web & nodeJS
* **[Open Exchange Rates](https://openexchangerates.org "realtime and historical exchange rates/currency conversion data API")** - the free currency conversion data API

---

## Changelog

**v0.4.2** - Added bower.json

**v0.4.1** - Alias `accounting.formatNumber()` as `accounting.format()`

**v0.4** - Transferred repository to Open Exchange Rates for ongoing maintenance

**v0.3.2** - Fixed package.json dependencies (should be empty object)

**v0.3.0**
* Rewrote library structure similar to underscore.js for use as a nodeJS/npm and AMD module. Use `npm install accounting` and then `var accounting = require("accounting");` in your nodeJS scripts. 
* Also works with requireJS or any AMD module loader.
* **unformat** now only attempts to parse the number if it's not already a valid number. 
* `acounting.unformat` now also aliased as `acounting.parse`
* Fixed an IE bug in the `defaults` method

**v0.2.2** - Fixed same issue as \#Num: #24 in **formatNumber**; switch to Google Closure Compiler for minified version.

**v0.2.1** - Fixed issue \#Num: #24 (locally-defined settings object was being modified by **formatMoney**)

**v0.2**
* Rewrote formatting system for **formatMoney** and **formatColumn** for better control of string output
* Now supports separate formats for negative and zero values (optionally) via `accounting.settings.currency.format`
* Internal improvements and helper methods

**v0.1.4**
* **formatMoney** recursively formats arrays
* Added Jasmine test suite (thanks to [millermedeiros](https://github.com/millermedeiros)) and QUnit functionality/speed tests

**v0.1.3**
* Added configurable settings object for default formatting parameters.
* Added `format` parameter to control symbol and value position (default `"%s%v"`, or [symbol][value])
* Methods consistently accept object as 2nd parameter, matching/overriding the library defaults

**v0.1.2**
* **formatColumn** works recursively on nested arrays (e.g. `accounting.formatColumn( [[1,12,123,1234], [1234,123,12,1]] )`, returns matching array with inner columns lined up)
* Fix rounding in **formatNumber**

**v0.1.1**
* Added **toFixed** method (`accounting.toFixed(value, precision)`), which treats floats more like decimals for more accurate currency rounding
* Minified version preserves semicolons
* Fixed `NaN` errors when no value in **unformat**

**v0.1** - First version
