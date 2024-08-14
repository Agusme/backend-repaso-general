const serviciosDeProductos = require("../services/producto.services");

const crearProducto = async (req, res) => {
  const result = await serviciosDeProductos.nuevoProducto(req.body);
  if (result.statusCode === 201) {
    res.status(201).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: result.msg });
  }
};

const traerTodosLosProductos = async (req, res) => {
  const result = await serviciosDeProductos.obtenerProductos();
  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.productos });
  } else {
    res.status(500).json({ msg: result.msg });
  }
};

const traerUnProducto = async(req, res) => {
  const result =await serviciosDeProductos.obtenerProducto(req.params.idProducto)
  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.producto });
  } else {
    res.status(500).json({ msg: result.msg });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const id = req.params.idProducto
    const result = await serviciosDeProductos.actualizarProducto(id, req.body);
    res.status(result.statusCode).json({ msg: result.msg });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ msg: "Error al actualizar el producto", error: error.message });
  }
};
const borrarProducto = async (req, res) => {
  const result = await serviciosDeProductos.eliminarProducto(req.params.idProducto);

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: result.msg });
  }
};

const agregarImagenProducto = async(req, res)=>{
  const result = await serviciosDeProductos.imagenProducto(req.params.idProducto, req.file)
if(result.statusCode === 200){
  res.status(200).json({msg: result.msg})
}else{
  res.status(500).json({msg:result.msg})
}
}


const agregarProductosAfav =async(req, res)=>{
  const result = await serviciosDeProductos.agregarProductosAfav(req.params.idProducto, req.idUsuario)
if(result.statusCode === 200){
  res.status(200).json({msg: result.msg})
}else{
  res.status(500).json({msg:result.msg})
}
}
const agregarProductosAlCarrito =async(req, res)=>{
  const result = await serviciosDeProductos.agregarProductosAlCarrito(req.params.idProducto, req.idUsuario)
  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg})
  }else{
    res.status(500).json({msg:result.msg})
  }
}

const borrarProductosAlCarrito =async(req, res)=>{
  const result = await serviciosDeProductos.borrarProductosCaarrito(req.params.idProducto, req.idUsuario)
  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg})
  }else{
    res.status(500).json({msg:result.msg})
  }
}

const borrarProductosAFav =async(req, res)=>{
  const result = await serviciosDeProductos.borrarProductosAfav(req.params.idProducto, req.idUsuario)
  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg})
  }else{
    res.status(500).json({msg:result.msg})
  }
}
module.exports = {
  crearProducto,
  traerTodosLosProductos,
  traerUnProducto,
  actualizarProducto,
  borrarProducto,
  agregarImagenProducto,
  agregarProductosAfav,
  agregarProductosAlCarrito,
  borrarProductosAlCarrito,
  borrarProductosAFav
  
};
