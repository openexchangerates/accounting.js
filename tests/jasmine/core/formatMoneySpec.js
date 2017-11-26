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

    it('should allow precision to be `0` and not override with default `2`', function(){
        expect( accounting.formatMoney(5318008, "$", 0) ).toBe( '$5,318,008' );
    });

    it('should accept number as string and work with non-standard separators', function(){
        expect( accounting.formatMoney("123,45", "€ ", 2, ".", ",") ).toBe( "€ 123,45" );
        expect( accounting.formatMoney("1.234,56", "R$ ", 2, ".", ",") ).toBe( "R$ 1.234,56" );
    });

});
