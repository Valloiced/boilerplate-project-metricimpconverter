function ConvertHandler() {

  this.getNum = function(input) {
    let regex = /^\d*(\/)?(\/?\.?\d)*/g
    let match = input.match(regex).pop()
    let tempArr = []
    console.log(input)
    
    if(input == "" || input.match(/^[A-Za-z]/g)){
      return 1
    }

    for(let letter of match){
      if(letter == "/"){
        tempArr.push(letter)
      }
    }

    if(tempArr.length > 1 ){
      return false
    }

    let result = eval(match)
    return result
  };
  ///////////////////////////////////////////////
  this.getUnit = function(input) {
    let validUnits = ["kg", "mi", "gal", "l", "km", "lbs"]
    let regex = /[a-zA-Z]/g
    let match
    if(!input.match(regex)){
      return false
    } 
    match = input.match(regex).join("")
    if(match == "L" || match == "l"){
      return "L"
    }

    let lowered = match.toLowerCase()
    if(validUnits.indexOf(lowered) == -1){
      return false
    }
    return lowered
  };
  
  this.getReturnUnit = function(initUnit) {
    let units = {
      "mi": "km",
      "kg": "lbs",
      "gal": "L",
      "km": "mi",
      "lbs": "kg",
      "L": "gal"
    }
    
    return units[initUnit];
  };

  this.spellOutUnit = function(unit) {
    let units = {
      "mi": "miles",
      "kg": "kilograms",
      "gal": "gallons",
      "km": "kilometers",
      "lbs": "pounds",
      "L": "liters"
    }
    
    return units[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    if(initUnit == "gal" || initUnit == "L"){
      if(initUnit == "gal"){
        return eval(initNum * galToL)
      }
      return eval(initNum / galToL)
    } else if(initUnit == "lbs" || initUnit == "kg"){
      if(initUnit == "lbs"){
        return eval(initNum * lbsToKg)
      }
      return eval(initNum / lbsToKg)
    } else if(initUnit == "mi" || initUnit == "km"){
      if(initUnit == "mi"){
        return eval(initNum * miToKm)
      }
      return eval(initNum / miToKm)
    }
    
    return "Invalid";
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let string = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    
    return string;
  };
  
}

module.exports = ConvertHandler;
