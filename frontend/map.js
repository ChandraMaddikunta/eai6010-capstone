let map;
let riskRecords;


function getMapProperties() {
  let center = MAP_CENTER;
  let zoom = 9;
  
  return {
    center: new google.maps.LatLng(center.lat, center.long),
    zoom: zoom,
    mapTypeControlOptions: {mapTypeIds: MAP_TYPE_IDS},
    disableDefaultUI: true,
    restriction: {latLngBounds: MAP_RESTRICTION_BOUNDS, strictBounds: false}
  }
}

function setMapStyle(mapStyle) {
  let name = "COVID-19 in Massachusetts";
  const styledMapType = new google.maps.StyledMapType(mapStyle, {name: name});
  map.mapTypes.set("styled_map", styledMapType);
  map.setMapTypeId("styled_map");
}


function mouseoverListener(event) {
  map.data.revertStyle();
  map.data.overrideStyle(event.feature, {strokeWeight: 2});
}

function mouseoutListener(event) {
  map.data.revertStyle();
}


function fillUpInfoBox(zone) {
  document.getElementById("info-box").innerHTML = includeTextContent(zone);
}

function clickListener(event) {
  let zone = riskRecordsMapped[event.feature.getProperty("GEOID10")];
  fillUpInfoBox(zone);
}

async function setMapGeoData() {
  let massachusettsGeoJson = await backend.getMassachusettsGeoData();
  map.data.addGeoJson(massachusettsGeoJson);
}

function resolveRiskIndexRecords() {
  for (record of riskRecords) {
    riskRecordsMapped[record.zipCode] = {
      city: record.city,
      county: record.county,
      riskIndex: record.riskIndex,
      zipCode: record.zipCode,
      lat: record.lat,
      long: record.long
    };
  }
}

function fillUpMostDangereousTable() {
  let mostDangerous = riskRecords.slice(0, 5);
  let table = document.getElementById("most-dangerous-table");
  let cells = ["zipCode", "city", "county", "riskIndex"];
  
  for (rowRecord of mostDangerous) {
    let row = table.insertRow();
    cells.map((cellName) => {
        row.insertCell().innerHTML = rowRecord[cellName]
      }
    )
  }
}

function removeChildren(el) {
  let child = el.lastElementChild;
  while (child) {
    el.removeChild(child);
    child = el.lastElementChild;
  }
}

function hintOnclick() {
  let input = document.getElementById("search-input");
  let zone = this.zone;
  input.value = `${zone.zipCode} ${zone.city} ${zone.county} `;
  console.log(zone);
  map.panTo(new google.maps.LatLng(zone.long, zone.lat));
  map.setZoom(13);
  
  let ul = document.getElementById("search-helper-ul");
  removeChildren(ul);
  fillUpInfoBox(zone);
}

function appendSearches(ul, filter) {
  filter = filter.toUpperCase();
  if (!filter){ return }
  let matchedZones = riskRecords.filter(function (el) {
    let matchZip = el.zipCode.toUpperCase().indexOf(filter) !== -1;
    let matchCity = el.city.toUpperCase().indexOf(filter) !== -1;
    let matchCounty = el.county.toUpperCase().indexOf(filter) !== -1;
    return matchZip || matchCity || matchCounty;
  }).slice(0, 5);
  
  for (let zone of matchedZones) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.innerHTML = `${zone.zipCode} ${zone.city} ${zone.county} `;
    a.zone = zone;
    a.onclick = hintOnclick;
    li.appendChild(a);
    ul.appendChild(li);
  }
}

function search() {
  let input = document.getElementById("search-input");
  let filter = input.value;
  let ul = document.getElementById("search-helper-ul");
  removeChildren(ul);
  appendSearches(ul, filter);
}

async function initMap() {
  riskRecords = await backend.getRiskIndexRecords();
  fillUpMostDangereousTable();
  resolveRiskIndexRecords();
  
  let props = await getMapProperties();
  map = new google.maps.Map(
    document.getElementById("googleMap"), props
  );
  
  setMapStyle(MAP_STYLE);
  map.data.setStyle(getStyleProvincePolygon);
  
  await setMapGeoData();
  
  let counties = await backend.getCountyWiseStats();
  countyBarChartPlot(counties);
  
  map.data.addListener('click', clickListener);
  map.data.addListener('mouseover', mouseoverListener);
  map.data.addListener('mouseout', mouseoutListener);
}
