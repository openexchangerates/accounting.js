describe('formatMoney()', function(){
    
    it('should work for small numbers', function(){
    
        expect( accounting.formatMoney(123) ).toBe( '$123.00' );
        expect( accounting.formatMoney(123.45) ).toBe( '$123.45' );
        expect( accounting.formatMoney(12345.67) ).toBe( '$12,345.67' );
    
    });

    it('should work for negative numbers', function(){
    
        expect( accounting.formatMoney(-123) ).toBe( '$-123.00' );
        expect( accounting.formatMoney(-123.45) ).toBe( '$-123.45' );
        expect( accounting.formatMoney(-12345.67) ).toBe( '$-12,345.67' );
    
    });

});
