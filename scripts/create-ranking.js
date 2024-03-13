const { runReport } = require('./analytics-api.js');

const fs = require('fs');
const currentDate = new Date().toISOString();

async function main() {
  const propertyId = 'YOUR_PROPERTY_ID'; // プロパティIDを適切な値に置き換える

  // analyticsDataClient などのクライアントを適切に初期化する

  try {
    const response = await runReport();

    let rankings = []
    response.rows.forEach((row) => {
      rankings.push({
        pagePath: row.dimensionValues[0].value,
        pv: row.metricValues[0].value,
      })
    })
    fs.writeFileSync(
      'data/ranking.json',
      JSON.stringify(
        {
          items: rankings,
          createdAt: currentDate
        },
        null,
        4
      )
    )
  } catch (error) {
    console.error('Error running report:', error);
  }
}

main();
