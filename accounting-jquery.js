( function( $ ){
	var methods = {
		settings: function ( options ) {
			//Fetch library's settings object.
			var settings = accounting.settings;

			//Merge in our new options
			settings = $.extend(settings, options);

			//Update library's settings object.
			accounting.settings = settings;
			
			//Keep the jQuery chain going.
			return this;
		},
		formatMoney: function( options ) {
			return this.each(function() {
				$this = $(this);

				//Get value for processing.
				var value = $this.html();

				//Format the value.
				var formatted = accounting.formatMoney(value, options);

				//Apply the formatted value to the element.
				$this.html(formatted);
			});
		},
		formatColumn: function( options ) {
			var column = new Array();

			//Collect our values into an array to pass to formatColumn().
			this.each(function() {
				var $this = $(this);
				column.push($this.html());
			});

			//Send it off for formatting.
			var formattedColumn = accounting.formatColumn(column, options);

			//Now set the element's values.
			return this.each(function(i) {
				var $this = $(this);
				var value = formattedColumn[i];
				$this.html(value);
			});
		},
		formatNumber: function( options ) {
			return this.each(function() {
				$this = $(this);

				//Get value for processing
				var value = $this.html();

				//Format the value
				var formatted = accounting.formatNumber(value, options);

				//Apply the formatted value to the element
				$this.html(formatted);
			});
		},
		toFixed: function( precision ) {
			return this.each(function() {
				$this = $(this);

				//Get value for processing.
				var value = $this.html();

				//Format the value.
				var formatted = accounting.toFixed(value, precision);

				//Apply the formatted value to the element.
				$this.html(formatted);
			});
		},
		unformat: function( decimal ) {
			return this.each(function() {
				$this = $(this);

				//Get value for processing.
				var value = $this.html();

				//Format the value.
				var formatted = accounting.unformat(value, decimal);

				//Apply the formatted value to the element.
				$this.html(formatted);
			});
		}
	};

	$.fn.accounting = function( method ) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.settings.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.accounting' );
		}    
	};
})( jQuery );
