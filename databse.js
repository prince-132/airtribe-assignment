const { createPool } = require('mysql');
const schema = require("./schema");
const { createInstructor, createCourses, createLeads, createComment } = schema;

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    connectionLimit: 10,
    database: 'airtribe' // Switch to airtribe database
});

// Create the airtribe database if it doesn't exist
pool.query(`CREATE DATABASE IF NOT EXISTS airtribe;`, (error, result) => {
    if (error) {
        throw error;
    }
    console.log(result);
});

function createTables() {
    const list = [createInstructor, createCourses, createLeads, createComment];
    list.forEach((item) => {
        pool.query(item(), (err, result) => {
            if (err) {
                throw err;
            }
            
        });
    });
}

module.exports = { createTables, pool };
