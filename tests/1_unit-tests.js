const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('Can get number?', () => {
        assert.isNumber(convertHandler.getNum("30gal"))
        assert.isNumber(convertHandler.getNum("30"))
    })
    test('Can get decimal?', () => {
        assert.equal(convertHandler.getNum("30.54km"), 30.54)
        assert.isNumber(convertHandler.getNum("30.54"))
    })
    test('Can get fraction?', () => {
        assert.equal(convertHandler.getNum("1/2lbs"), 0.5)
        assert.isNumber(convertHandler.getNum("1/2lbs"))
    })
    test('Can get fraction that have decimal', () => {
        assert.equal(convertHandler.getNum("1.2/4gal"), 0.3)
        assert.isNumber(convertHandler.getNum("1.2/4gal"))
    })
    test('Error when double fraction', () => {
        assert.equal(convertHandler.getNum("1/2/3gal"), false)
    })
    test('Return a default numerical 1 if there is no unit specified', () => {
        assert.equal(convertHandler.getNum("gal"), 1)
        assert.equal(convertHandler.getNum(""), 1)
    })
    test('Should correctly read all valid inputs', () => {
        assert.equal(convertHandler.getUnit("14kg"), "kg")
        assert.equal(convertHandler.getUnit("14mi"), "mi")
        assert.equal(convertHandler.getUnit("14gal"), "gal")
        assert.equal(convertHandler.getUnit("14km"), "km")
        assert.equal(convertHandler.getUnit("14l"), "L")
        assert.equal(convertHandler.getUnit("14lbs"), "lbs")
    })
    test('Return error if invalid input unit', () => {
        assert.equal(convertHandler.getUnit("14lbsdsds"), false)
        assert.equal(convertHandler.getUnit("1s4lLabdasdkajdhksh"), false)
    })
    test('Return the correct unit for each valid input', () => {
        assert.equal(convertHandler.getReturnUnit("lbs"), "kg")
        assert.equal(convertHandler.getReturnUnit("kg"), "lbs")
        assert.equal(convertHandler.getReturnUnit("km"), "mi")
        assert.equal(convertHandler.getReturnUnit("mi"), "km")
        assert.equal(convertHandler.getReturnUnit("gal"), "L")
        assert.equal(convertHandler.getReturnUnit("L"), "gal")
    })
    test('Return the spelled out unit for each valid unit', () => {
        assert.equal(convertHandler.spellOutUnit("L"), "liters")
        assert.equal(convertHandler.spellOutUnit("kg"), "kilograms")
        assert.equal(convertHandler.spellOutUnit("gal"), "gallons")
        assert.equal(convertHandler.spellOutUnit("km"), "kilometers")
        assert.equal(convertHandler.spellOutUnit("mi"), "miles")
        assert.equal(convertHandler.spellOutUnit("lbs"), "pounds")
    })
    test('Should convert gal to L', () => {
        assert.equal(convertHandler.convert(20, "gal"), 75.7082)
    })
    test('Should convert L to gal', () => {
        assert.equal(convertHandler.convert(20, "L"), 5.283443537159779)
    })
    test('Should convert mi to km', () => {
        assert.equal(convertHandler.convert(20, "mi"), 32.1868)
    })
    test('Should convert km to mi', () => {
        assert.equal(convertHandler.convert(20, "km"), 12.427454732996136)
    })
    test('Should convert lbs to kg', () => {
        assert.equal(convertHandler.convert(20, "lbs"), 9.07184)
    })
    test('Should convert kg to lbs', () => {
        assert.equal(convertHandler.convert(20, "kg"), 44.09248840367555)
    })
});