/**
 * accounting-units.js [alpha]
 *
 * Adds a formatUnits method to the accounting.js library (load after accounting.js)
 */

/**
 * Format large values into units (eg. 100K, 12GB)
 *
 * `base` is the division between units (e.g. 1000 for thousands, 1024 for bytes, etc.)
 * `units` is a string or array of strings to apply to each level of division
 * (e.g. ["K", "M", "B"] for base 1000)
 * `callback` is a function to apply to the value before returning, with the number and the
 * relevant unit as params. Can be used to format the number/currency before adding the unit.
 *
 * Examples (see docs for more info):
 *     accounting.formatUnits(12345678, 1000, ["K", "M", "B"], function(num, units) {
 *         return accounting.formatNumber(num, 3) + units;
 *     }); // "12.346M"
 *     accounting.formatUnits(123456, 1000000, "M"); // only return millions
 *     accounting.formatUnits(12345678, 1024, ["KB", "MB", "GB"]); // bytes
 */
accounting.formatUnits = function(number, base, units, callback) {
	// Clean up params:
	number = accounting.unformat(number);
	base = base || 1;
	units = typeof units === "string" ? [units] : units || [""];

	// These are used later:
	var unit,
		neg = number < 0;

	// If the number is smaller than base, divide it and add the first or only unit:
	if ( number < base || base === 1 ) {
		number /= base;
		unit = units.shift();
	} else {
		// Divide number by base until it's smaller than base or has reached the largest unit:
		while ( base > 1 && number > Math.abs(base) && units.length ) {
			number /= base;

			// Get next unit:
			unit = units.shift();
		}
	}

	// Apply callback(number, units) to number:
	return typeof callback === "function" && callback.call([], number, unit) || number + unit;
}