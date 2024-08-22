const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim:true, /* saca espacios en blanco */
    minlength:[ 5, 'minimo permitido 5 caracteres'],
    maxlength:[50, 'maximo de caracters permitido']
},
precio:{
    type:Number,
    required: true,
    default: 0
},
description:{
    type:String,
    required:true,
    trim:true
},
imagen:{
    type:String,
    default:''
},
bloqueado:{
    type:Boolean,
    
}
});


const ProductoModel = model('Productos', ProductoSchema)

module.exports= ProductoModel



