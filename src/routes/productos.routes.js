const express = require('express');
const { crearProducto, traerTodosLosProductos, traerUnProducto, actualizarProducto, borrarProducto, agregarImagenProducto, agregarProductosAfav, borrarProductosAlCarrito, borrarProductosAFav, agregarProductosAlCarrito, habilitarUnProducto, deshabilitarUnProducto } = require('../controller/producto.controller');
const multer = require('../middlewares/multer');
const auth = require('../middlewares/auth');

const router = express.Router()


router.post("/", crearProducto);
router.get("/",traerTodosLosProductos);
router.get("/:idProducto", traerUnProducto);
router.put("/:idProducto", actualizarProducto);
router.delete("/:idProducto", auth("admin"), borrarProducto);
router.put('/habilitar/:idProducto', auth('admin'), habilitarUnProducto)
router.put('/deshabilitar/:idProducto',auth('admin'), deshabilitarUnProducto)

router.post('/agregarImagen/:idProducto', multer.single('imagen'), agregarImagenProducto)
router.post('/agregarProductosAfav/:idProducto', auth("usuario"), agregarProductosAfav)
router.post('/ProductosAlCarrito/:idProducto', auth("usuario"), agregarProductosAlCarrito)
router.delete('/borrarProductosAFav/:idProducto', auth("usuario"), borrarProductosAFav)
router.delete('/borrarProductosAlCarrito/:idProducto',  auth("usuario"), borrarProductosAlCarrito)




module.exports = router;