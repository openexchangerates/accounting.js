( function( $ ){
	var methods = {
		init: function( options ) {

		},
		formatMoney: function() {
			return this.each(function() {
				$this = $(this);

				//Get value for processing
				var value = $this.html();

				//Format the value
				var formatted = accounting.formatMoney(value);

				//Apply the formatted value to the element
				$this.html(formatted);
			});
		},
		formatColumn: function() {

		},
		formatNumber: function() {
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
		toFixed: function() {
			return this.each(function() {
				$this = $(this);

				//Get value for processing
				var value = $this.html();

				//Format the value
				var formatted = accounting.toFixed(value);

				//Apply the formatted value to the element
				$this.html(formatted);
			});
		},
		unformat: function() {
			return this.each(function() {
				$this = $(this);

				//Get value for processing
				var value = $this.html();

				//Format the value
				var formatted = accounting.unformat(value);

				//Apply the formatted value to the element
				$this.html(formatted);
			});
		}
	};

	$.fn.accounting = function( method ) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.accounting' );
		}    
	};
})( jQuery );
