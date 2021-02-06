const Producto = require("../models/Producto");

exports.crearProducto = async (req, res) => {
    try {

        let producto;
        producto = new Producto(req.body);
        await producto.save();
        res.send(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al intentar crear producto');
    }
}

exports.obtenerProductos = async(req, res)=>{
    try {
        
        const productos = await Producto.find();
        res.json(productos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al intentar obtener lista de productos');
    }
}
 
exports.actualizarProducto = async(req, res)=>{
    try {
        const {nombre, categoria, ubicacion, precio} = req.body;
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({msg: 'No se encontro producto registrado'});
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;

        producto = await Producto.findByIdAndUpdate({_id: req.params.id}, producto, {new:true} );
        res.json(producto);

 
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al intentar actualizar producto');
    }
}

exports.obtenerProducto = async(req, res)=>{
    try {
        
        let producto = await Producto.findById(req.params.id);
        if (!producto) {
            res.status(404).json({msg: 'No se encontro producto registrado solicitado'});
        }
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al intentar obtener producto unitario');
    }
}

exports.eliminarProducto = async(req, res)=>{
    try {
        
        let producto = await Producto.findById(req.params.id);
        if (!producto) {
            res.status(404).json({msg: 'No se pudo eliminar producto solicitado'});
        }

        await Producto.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Se elimino el producto correctamente'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al intentar eliminar producto');
    }
}