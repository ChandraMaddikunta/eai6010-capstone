const countyWiseRecordQuery = `
{
  countyWiseCurrentRecords {
    casesConfirmed
    county
  }
}
`;

const riskIndexRecordsQuery = `
{
  riskIndexRecords {
    zipCode
    city
    county
    riskIndex
    lat
    long
  }
}`;