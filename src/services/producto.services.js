const { cloudinary } = require("../helpers/cloudinary");


const ProductoModel = require("../models/producto.schema");
const UserModel = require("../models/user.schema");

const nuevoProducto = async (body) => {
  try {
    const product = new ProductoModel(body);
    await product.save();
    return {
      msg: "Producto creado",
      statusCode: 201,
    };
  } catch (error) {
    return {
      msg: "Error al crear el producto",
      statusCode: 500,
      error,
    };
  }
};

const obtenerProductos = async () => {
  try {
    const productos = await ProductoModel.find();
    return {
      productos,
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al crear el producto",
      statusCode: 500,
      error,
    };
  }
};

const obtenerProducto = async (idProducto) => {
  try {
    const producto = await ProductoModel.findById(idProducto);

    return {
      producto,
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al crear el producto",
      statusCode: 500,
      error,
    };
  }
};
const actualizarProducto = async (idProducto, body) => {
  try {
    const productoActualizado = await ProductoModel.findByIdAndUpdate(
      idProducto,
      body,
      { new: true }
    );
    if (productoActualizado) {
      return {
        msg: "Producto actualizado",
        statusCode: 200,
      };
    } else {
      return {
        msg: "Producto no existe",
        statusCode: 404,
      };
    }
  } catch (error) {
    return {
      msg: "Error al actualizar el producto",
      statusCode: 500,
      error,
    };
  }
};

const eliminarProducto = async (idProducto) => {
  const productoExiste = await ProductoModel.findById(idProducto);
  if (productoExiste) {
    await ProductoModel.findByIdAndDelete({ _id: idProducto });
    return {
      msg: "Producto eliminado",
      statusCode: 200,
    };
  } else {
    return {
      msg: "Producto no existe",
      statusCode: 400,
    };
  }
};

const imagenProducto = async (idProducto, file) => {
  try {
    const product = await ProductoModel.findById({ _id: idProducto });
    const imagen = await cloudinary.uploader.upload(file.path);
    product.imagen = imagen.url;
    await product.save();
    return {
      msg: "Imagen guardada",
      statusCode: 200,
    };
  } catch (error) {
    console.log("error al subir la img:", error)
    return {
      msg: "Error al subir img",
      statusCode: 400,
    };
  }
};

const agregarProductosAfav = async (idProducto, idUsuario) => {
try {
  console.log("ID Producto:", idProducto);
    console.log("ID Usuario:", idUsuario);
  const producto = await ProductoModel.findById(idProducto);
  if (!producto) {
    return {
      msg: "Producto no encontrado",
      statusCode: 404,
    };
  }
  const usuario = await UserModel.findById(idUsuario);
  if (!usuario) {
    return {
      msg: "Usuario no encontrado",
      statusCode: 404,
    };
  }
  const productoExiste = usuario.favoritos.find(
    (prod) => prod.id === idProducto
  );
  if (productoExiste) {
    return {
      msg: "Producto ya existe en fav",
      statusCode: 400
    };
  }
usuario.favoritos.push(producto)

  await usuario.save();
  return{
    msg:'producto agregado al fav',
    statusCode: 200
  }
  
} catch (error) {
  console.error("Error al agregar al fav:", error); 

  return {
    msg: "Error al agregar al fav",
    statusCode: 500,
  };
}
};

const agregarProductosAlCarrito = async (idProducto, idUsuario) => {
  try {
    const producto = await ProductoModel.findById(idProducto);
    const usuario = await UserModel.findById(idUsuario);

    const productoExiste = usuario.carrito.find(
      (prod) => prod.id === idProducto
    );

    if (productoExiste) {
      return {
        msg: "Producto ya existe en fav",
        statusCode: 400
      };
    }
  
    usuario.carrito.push(producto);

    await usuario.save();
    return{
      msg:'producto agregado al carrito',
      statusCode: 200
    }
    
  } catch (error) {
    console.error("Error al agregar al fav:", error); // Imprime el error en la consola

    return {
      msg: "Error al agregar al carrito",
      statusCode: 500,
    };
  }
  };

  const borrarProductosAfav = async (idProducto, idUsuario) => {
    try {
      const usuario = await UserModel.findById(idUsuario);
    
      const posicionProducto = usuario.favoritos.findIndex(
        (prod) => prod.id === idProducto
      );
  
      usuario.favoritos.splice(posicionProducto, 1);
      await usuario.save();
      return{
        msg:'producto borrado de fav',
        statusCode: 200
      }
      
    } catch (error) {
      return {
        msg: "Error al borrar de fav",
        statusCode: 500,
      };
    }
    };

    const borrarProductosCaarrito = async (idProducto, idUsuario) => {
      try {
        const usuario = await UserModel.findById(idUsuario);
      
        const posicionProducto = usuario.carrito.findIndex(
          (prod) => prod.id === idProducto
        );
    
        usuario.carrito.splice(posicionProducto, 1);
        await usuario.save();
        return{
          msg:'producto borrado de  carrito',
          statusCode: 200
        }
        
      } catch (error) {
        return {
          msg: "Error al borrar de carrito",
          statusCode: 500,
        };
      }
      };




module.exports = {
  nuevoProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
  imagenProducto,
  agregarProductosAfav,
  agregarProductosAlCarrito,
  borrarProductosAfav,
  borrarProductosCaarrito,

};
