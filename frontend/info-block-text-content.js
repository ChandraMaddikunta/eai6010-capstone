function includeTextContent(zoneObj) {
  return `
<div>
  <span class="location-label">${zoneObj.zipCode} ${zoneObj.county} ${zoneObj.city}</span>
  <span>Risk Index: ${zoneObj.riskIndex.toFixed(0)}</span>
</div>
`
}
