const HOST_URL = "";

const http = axios.create({
  baseURL: `${HOST_URL}`,
});

async function graphqlRequest(query) {
  const requestBody = {"query": query};
  return await http.post("/graphql-api", requestBody);
}

async function getMassachusetts() {
  let response = await http.get(`/static/risk_index.geojson`);
  return response.data;
}

async function getCountyWiseStats() {
  let response = await graphqlRequest(countyWiseRecordQuery)
  return response.data.data.countyWiseCurrentRecords;
}

async function getRiskIndexRecords() {
  let response = await graphqlRequest(riskIndexRecordsQuery);
  return response.data.data.riskIndexRecords;
}

const backend = {
  getMassachusettsGeoData: getMassachusetts,
  getCountyWiseStats: getCountyWiseStats,
  getRiskIndexRecords: getRiskIndexRecords,
};
