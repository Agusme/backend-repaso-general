/* config de data base */

/* instalo moongoose */
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_CONNECT).then(()=>console.log('BASE DE DATOS CONECTADA'))
.catch((error) => console.log('error al conectar con la db', error))

