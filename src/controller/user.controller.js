const serviciosDeUsuarios = require('../services/user.services')
const {validationResult}= require('express-validator')
const registrarUsuario = async (req, res) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
     res.status(400).json({errors: errors.array()})
    }
    console.log('Datos recibidos para crear usuario:', req.body); // Verifica los datos aquí
    const result = await serviciosDeUsuarios.nuevoUsuario(req.body);
    res.status(result.statusCode).json({ msg: result.msg });
  } catch (error) {
    console.error('Error interno del servidor:', error); // Para depuración
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

const obtenerTodosLosUsuarios = async (req, res)=>{
  const result =await serviciosDeUsuarios.todosLosUsuarios();
if (result.statusCode === 200){
  res.status(200).json({msg: result.usuarios})
}else{
  res.status(500).json({msg: result.msg})
}
}

const obtenerUnUsuario = async (req, res)=>{
const result = await serviciosDeUsuarios.unUsuario(req.params.idUsuario);
if (result.statusCode === 200){
  res.status(200).json({msg: result.usuario})
}else{
  res.status(500).json({msg: result.msg})
}
}

const actualizarUsuario = async(req, res)=>{
try {
  const id = req.params.idUsuario
  const result = await serviciosDeUsuarios.editarUsuario(id, req.body);
  res.status(result.statusCode).json({ msg: result.msg });

} catch (error) {
  console.error("Error al actualizar el producto:", error);

  res.status(500).json({msg:'Error al actualizar usuario'})
}
}
const eliminarUsuario = async (req, res) => {
  try {
    const result = await serviciosDeUsuarios.borrarUsuario(req.params.idUsuario);

    if (result.statusCode === 200) {
      res.status(200).json({ msg: result.msg });
    } else {
      res.status(result.statusCode).json({ msg: result.msg });
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};


const iniciarSesion = async(req, res)=>{
  try {
    const result = await serviciosDeUsuarios.inicioSesionUsuario(req.body);

    if(result.code === 400){
      res.status(400).json({msg:'Usuario y/o contraseña incorrecta'})
    }else{
      res.status(200).json({msg:'Inicio de sesion correcta', token: result.token})
    }
  } catch (error) {
    console.error('Error interno del servidor:', error); // Para depuración
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
}

module.exports={
  registrarUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  actualizarUsuario,
  eliminarUsuario,
  iniciarSesion
}