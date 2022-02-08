const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Get request to /api/convert with 10L input', (done) => {
        chai
        .request(server)
        .get("/api/convert?input=10L")
        .end((err, res) => {        
            assert.equal(res.text, '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}')
            done()
        })
    })
    test('Must be an invalid when Get request using invalid unit: 32g', (done) => {
        chai
        .request(server)
        .get("/api/convert?input=32g")
        .end((err, res) => {
            assert.equal(res.text, "invalid unit")
            done()
        })
    })
    test("Converting invalid number using 3/7.2/4kg that must return invalid", (done) => {
        chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kg")
        .end((err, res) => {
            assert.equal(res.text, "invalid number")
            done()
        })
    })
    test("Must be invalid in both number and units when Get request using 3/7.2/4kilomegagram", (done) => {
        chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kilomegagram")
        .end((err, res) => {
            assert.equal(res.text, "invalid number and unit")
            done()
        })
    })
    test("The test must use the default number when no number is given to the input", (done) => {
        chai
        .request(server)
        .get("/api/convert?input=kg")
        .end((err, res) => {
            assert.equal(res.text, '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}')
            done()
        })
    })
});
