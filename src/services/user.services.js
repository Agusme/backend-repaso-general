const UserModel = require("../models/user.schema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { registroUsuario } = require("../helpers/messege");

const nuevoUsuario = async (body) => {
  try {
    const usuarioExiste = await UserModel.findOne({
      nombreUsuario: body.nombreUsuario,
    });

    if (usuarioExiste) {
      return {
        msg: "Usuario no disponible, ya existe",
        statusCode: 400,
      };
    }

    const usuario = new UserModel(body);

    let salt = bcrypt.genSaltSync(10);

    usuario.contrasenia = bcrypt.hashSync(body.contrasenia, salt);
  
    registroUsuario(body.emailUsuario);
    
    await usuario.save();
    return {
      msg: "Usuario Creado con exito",
      statusCode: 201,
    };
  } catch (error) {
    console.log(error)
    return {
      msg: "Error al crear usuario",
      statusCode: 500,
      error,
    };
  }
};

const todosLosUsuarios = async (body) => {
  try {
    const usuarios = await UserModel.find();
    return {
      usuarios,
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al obtener usuarios",
      statusCode: 500,
      error,
    };
  }
};

const unUsuario = async (idUsuario) => {
  try {
    const usuario = await UserModel.findById(idUsuario);

    return {
      usuario,
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al obtener usuario",
      statusCode: 500,
      error,
    };
  }
};

const editarUsuario = async (idUsuario, body) => {
  try {
    const usuarioActualizado = await UserModel.findByIdAndUpdate(
      idUsuario,
      body,
      { new: true }
    );
    if (usuarioActualizado) {
      return {
        msg: "Usuario actualizado",
        statusCode: 200,
      };
    } else {
      return {
        msg: "Usuario no existe",
        statusCode: 404,
      };
    }
  } catch (error) {
    return {
      msg: "Error al actualizar usuario",
      statusCode: 500,
      error,
    };
  }
};
const borrarUsuario = async (idUsuario) => {
  try {
    const usuarioEliminado = await UserModel.findByIdAndDelete(idUsuario);

    if (usuarioEliminado) {
      return {
        msg: "Usuario eliminado",
        statusCode: 200,
      };
    } else {
      return {
        msg: "Usuario no existe",
        statusCode: 404,
      };
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return {
      msg: "Error al eliminar usuario",
      statusCode: 500,
    };
  }
};

const inicioSesionUsuario = async (body) => {
  try {
    const usuarioExiste = await UserModel.findOne({
      nombreUsuario: body.nombreUsuario,
    });
    if (!usuarioExiste) {
      return {
        msg: "Usuario y/o contraseña incorrecto",
        statusCode: 400,
      };
    }
    const checkContrasenia = bcrypt.compareSync(
      body.contrasenia,
      usuarioExiste.contrasenia
    );

    if (checkContrasenia) {
      const payload = {
        _id: usuarioExiste._id,
        rol: usuarioExiste.rol,
        bloqueado: usuarioExiste.bloqueado,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return {
        code: 200,
        token,
      };
    } else {
      return {
        code: 400,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  nuevoUsuario,
  todosLosUsuarios,
  unUsuario,
  editarUsuario,
  borrarUsuario,
  inicioSesionUsuario,
};
