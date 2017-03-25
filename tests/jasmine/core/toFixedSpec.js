describe('toFixed()', function(){

    it('should work with all float rounding edge cases', function(){
        expect( accounting.toFixed(1.005, 2) ).toBe( '1.01' );
        expect( accounting.toFixed(1.005, 20) ).toBe( '1.00500000000000000000' );
    });

    it('should round negative values away from zero', function(){
        expect( accounting.toFixed(-1.005, 2) ).toBe( '-1.01' );
    });

    it('should accept negative exponents', function(){
        expect( accounting.toFixed(2.7755e-10, 2) ).toBe( '0.00' );
    });

});
