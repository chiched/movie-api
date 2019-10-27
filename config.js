const Pool = require('pg').Pool

const pool = new Pool({
    client: "pg",
      user: 'David',
      host: 'localhost',
      database: 'movies',
      password: '',
      port: 5432,
    })

try {
    pool.connect();
} catch(e) {
    console.log('Database Connection failed:' + e);
}


module.exports = pool;