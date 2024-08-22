const express = require("express");
const morgan = require("morgan");
require('dotenv').config()
require('./src/db/config')
const app = express();
const path = require('path'); 
const cors = require("cors");

app.use(cors())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.json())
app.use('/api', require('./src/routes/index.routes'));
app.listen(3001, () => {
  console.log("servidor andando");
});

