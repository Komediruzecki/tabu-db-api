const config = require('../config/config');
const { DatabaseError } = require('../errors/customErrors');
const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery client with authentication
const bigquery = new BigQuery({
    keyFilename: config.database.credentialsPath,
});
const schemaName = config.database.schema;

async function querySalaryByUniqueId(unique_id) {
    const query = `
        SELECT
            salary_net,
            salary_gross
        FROM
            \`${schemaName}.salary\`
        WHERE
            unique_id = @unique_id
        LIMIT 1
    `;
    const options = {
        query: query,
        params: { unique_id: unique_id },
    };

    try {
        const [rows] = await bigquery.query(options);
        return rows[0];
    } catch (err) {
        console.error('ERROR:', err);
        throw new DatabaseError(
            `Failed to query salary by unique ID: ${unique_id}`,
            err
        );
    }
}

module.exports = {
    querySalaryByUniqueId,
};
