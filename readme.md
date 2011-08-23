**accounting.js** is a tiny JavaScript library for number, money and currency formatting, with optional excel-style column rendering (to line up symbols and decimals). It's lightweight, fully localisable and has zero dependencies.

Check out the plugin homepage (with demos and docs) here: **http://josscrowcroft.github.com/accounting.js/**

## Changelog

### v0.1.1
* Added **toFixed** method (`accounting.toFixed(value, precision)`), which treats floats more like decimals for more accurate currency rounding - now, `0.615` rounds up to `$0.62` instead of `$0.61`.
* Minified version now preserves semicolons