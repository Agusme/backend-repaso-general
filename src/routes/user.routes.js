const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  registrarUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  actualizarUsuario,
  eliminarUsuario,
  iniciarSesion,
  habilitarUnUsuario,
  deshabilitarUnUsuario,
} = require("../controller/user.controller");
const { check } = require("express-validator");

router.post(
  "/",
  [check("nombreUsuario", "Campo NOMBRE USUARIO vacio").not().isEmpty()],
  [check("nombreUsuario", "Minimo 5 caracteres").isLength({ min: 5 })],
  [check("nombreUsuario", "Maximo 50 caracteres").isLength({ max: 50 })],
  [check("contrasenia", "Campo CONTRASEÑA vacio").not().isEmpty()],
  [
    check("contrasenia", "Min 5 y max 50 caracteres").isLength({
      min: 5,
      max: 50,
    }),
  ],
  registrarUsuario
);
router.get("/", auth("admin"), obtenerTodosLosUsuarios);
router.get("/:idUsuario", auth("admin"), obtenerUnUsuario);
router.put("/:idUsuario", auth("admin"), actualizarUsuario);
router.delete("/:idUsuario", auth("admin"), eliminarUsuario);
router.post(
  "/login",
  [check("nombreUsuario", "Campo NOMBRE USUARIO vacio").not().isEmpty()],
  [check("nombreUsuario", "Minimo 5 caracteres").isLength({ min: 5 })],
  [check("nombreUsuario", "Maximo 50 caracteres").isLength({ max: 50 })],
  [check("contrasenia", "Campo CONTRASEÑA vacio").not().isEmpty()],
  [
    check("contrasenia", "Min 5 y max 50 caracteres").isLength({
      min: 5,
      max: 50,
    }),
  ],
  iniciarSesion
);
router.put('/deshabilitar/:idUsuario', auth('admin'), deshabilitarUnUsuario)
router.put('/habilitar/:idUsuario', auth('admin'), habilitarUnUsuario)

module.exports = router;
