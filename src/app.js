require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { configPG } = require('./domain/repositories/repository_postgres');
const { Client } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', require('./routes/index'));

(async () => {
  const client = new Client(configPG);
  await client.connect();
  const res = await client.query('SELECT $1::text as connected', ['Connection to postgres successful!']);
  console.log(res.rows[0].connected);
  await client.end();
})();

app.listen(PORT, () => {
    console.log('Example app listening on url -->', 'http://localhost:'+PORT)
})
