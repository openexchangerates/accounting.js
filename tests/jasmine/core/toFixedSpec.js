describe('toFixed()', function(){

	it('should allow setting gaussian round', function(){

		expect( accounting.toFixed(123.505, 2, "gaussian") ).toBe( '123.50' );
		expect( accounting.toFixed(123.525, 2, "gaussian") ).toBe( '123.52' );
		expect( accounting.toFixed(123.515, 2, "gaussian") ).toBe( '123.52' );

	});

});
