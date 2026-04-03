const knex = require("knex");

const connection = process.env.DATABASE_URL;
const ssl = process.env.DB_SSL === "true";

const db = knex({
  client: "pg",
  connection: {
    connectionString: connection,
    ssl: ssl
      ? {
          rejectUnauthorized: false,
        }
      : false,
  },
});
module.exports = db;
