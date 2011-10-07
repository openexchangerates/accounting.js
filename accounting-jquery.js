( function( $ ){
	var methods = {
		/*init: function( options ) {
			//TODO: Some way to initialize the plug-in with defaults.
		},*/
		formatMoney: function( options ) {
			return this.each(function() {
				$this = $(this);

				//Get value for processing.
				var value = $this.html();

				//Format the value.
				var formatted = accounting.formatMoney(value);

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
			var formattedColumn = accounting.formatColumn(column);

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
				var formatted = accounting.formatNumber(value);

				//Apply the formatted value to the element
				$this.html(formatted);
			});
		},
		toFixed: function( options ) {
			return this.each(function() {
				$this = $(this);

				//Get value for processing.
				var value = $this.html();

				//Format the value.
				var formatted = accounting.toFixed(value);

				//Apply the formatted value to the element.
				$this.html(formatted);
			});
		},
		unformat: function( options ) {
			return this.each(function() {
				$this = $(this);

				//Get value for processing.
				var value = $this.html();

				//Format the value.
				var formatted = accounting.unformat(value);

				//Apply the formatted value to the element.
				$this.html(formatted);
			});
		}
	};

	$.fn.accounting = function( method ) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		/*} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );*/
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.accounting' );
		}    
	};
})( jQuery );
