let riskRecordsMapped = {};


function getStyleProvincePolygon(province) {
  let zipCode = province.getProperty("GEOID10");
  let zoneData = riskRecordsMapped[zipCode];
  
  let colorCoeff = zoneData.riskIndex / 110;
  
  // Additional scaling
  // colorCoeff = colorCoeff < 0.5 ? colorCoeff * 1.3 : colorCoeff;
  colorCoeff = colorCoeff < 0.2 ? colorCoeff * 2 : colorCoeff;
  colorCoeff = colorCoeff > 0.9 ? colorCoeff - 0.2 : colorCoeff;
  
  return ({
    fillColor: "#bf04d4",
    strokeColor: "black",
    fillOpacity: colorCoeff,
    strokeOpacity: 1,
    strokeWeight: 0.45
  });
}
