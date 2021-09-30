const pgtools = require("pgtools");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool();

const selectLeaderBoard = async (date) => {
  console.log(date);
  let query = `SELECT users.name,  crowdsourcing.created_at,count(user_id) FROM crowdsourcing
  LEFT JOIN Users ON crowdsourcing.user_id=users.uuid WHERE LOWER(users.team)=LOWER('ericsson') AND crowdsourcing.created_at='${date}'
GROUP BY crowdsourcing.created_at, users.name ORDER BY count DESC `;

  let result = null;
  try {
    result = await pool.query(query);
  } catch (e) {
    console.log(e);
  }

  return result.rows;
};

module.exports = {
  selectLeaderBoard,
};
