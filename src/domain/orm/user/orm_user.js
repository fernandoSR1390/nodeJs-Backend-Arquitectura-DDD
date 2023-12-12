const { Pool } = require("pg");
const { configPG } = require("../../repositories/repository_postgres");

const responseIva = async() => {
    try {
        const valueDui = '20227012283641';
        const pool =  new Pool(configPG);
        pool.connect();
        const text = "select * from employee";
        const values = [valueDui]
        const res = await pool.query(text, values);
        return res.rows;
    } catch (error) {
        console.log("Error: ", error)
    }
}

module.exports = {
    responseIva
};