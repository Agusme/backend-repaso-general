const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require('path'); 
require('dotenv').config()
require('./src/db/config')
const cors = require("cors"); // No olvides importar cors

app.use(express.static(path.join(__dirname, "../public")))
app.use(express.json())
app.use('/api', require('./src/routes/index.routes'));
app.listen(3001, () => {
  console.log("servidor andando");
});
app.use(cors())
app.use(morgan('dev'))