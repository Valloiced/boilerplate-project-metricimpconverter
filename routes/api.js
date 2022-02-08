'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let query = req.query.input
    let initNum = convertHandler.getNum(query)
    let initUnit = convertHandler.getUnit(query)
    let returnUnit = convertHandler.getReturnUnit(initUnit)

   if(!initNum && !initUnit){
     return res.send("invalid number and unit")
   } else if (!initNum){
     return res.send("invalid number")
   } else if (!initUnit){
     return res.send("invalid unit")
   }

    let convert = parseFloat(convertHandler.convert(initNum, initUnit).toFixed(5))
    let spellUnit = convertHandler.spellOutUnit(initUnit)
    let convSpellUnit = convertHandler.spellOutUnit(returnUnit)
    let string = convertHandler.getString(initNum, spellUnit, convert, convSpellUnit)

    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: convert,
      returnUnit: returnUnit,
      string: string
    })
  })
};
