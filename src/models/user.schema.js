const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    min: [5, "El minimo de caracteres es 5"],
    ma: [50, "El maximo de caracteres es 50"],
  },
  contrasenia: {
    type: String,
    required: true,
    trim: true,
  },

  emailUsuario: {
    type: String,
  },
  rol: {
    type: String,
    default: "usuario",
    enum: ["usuario", "admin"],
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
  carrito:[],
  favoritos:[]
});

/* Filtra datos x ej  la contrasenia */
UserSchema.methods.toJSON = function () {
  const { contrasenia, __v, ...usuario } = this.toObject();
  return usuario;
};

const UserModel = model("Usuarios", UserSchema);
module.exports = UserModel;
