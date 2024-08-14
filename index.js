const express = require("express");
const app = express();
const path = require('path'); 
require('dotenv').config()
require('./src/db/config')

app.use(express.static(path.join(__dirname, "../public")))
app.use(express.json())
app.use('/api', require('./src/routes/index.routes'));
app.listen(3001, () => {
  console.log("servidor andando");
});
