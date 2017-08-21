describe('defaults()', function(){

    it('Defs paramter should not overwrite the value null of the object parameter', function() {

        expect( defaults({flavour: null}, {flavor: "vanilla", sprinkles: "lots"}) ).toBe( {flavor: null, sprinkles: "lots"} );

    });

});
