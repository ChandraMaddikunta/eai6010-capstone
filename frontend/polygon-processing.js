let riskRecordsMapped = {};


function getStyleProvincePolygon(province) {
  console.log(province);
  let zipCode = province.getProperty("GEOID10");
  let zoneData = riskRecordsMapped[zipCode];
  let colorCoeff = 0;
  
  if (zoneData) {
    colorCoeff = zoneData.riskIndex / 110;
  }
  
  colorCoeff = colorCoeff > 0.9 ? colorCoeff - 0.2 : colorCoeff;
  
  return ({
    fillColor: "#bf04d4",
    strokeColor: "black",
    fillOpacity: colorCoeff,
    strokeOpacity: 1,
    strokeWeight: 0.45
  });
}
