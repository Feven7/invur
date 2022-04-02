import 'dotenv/config';
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

function initialize() {
    connection.query(`
        CREATE TABLE IF NOT EXISTS codes (
            guildid LONGTEXT(20) UNSIGNED NOT NULL,
            code TEXT(11) NOT NULL,
            activated BOOLEAN NOT NULL DEFAULT FALSE,
    `)
}

initialize();

export default connection;