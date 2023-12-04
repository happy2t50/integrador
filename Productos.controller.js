const Productos = require("../models/Productos.model.js");

// Crear y guardar un nuevo ControlInventario
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
    return;
  }

  // Obtener los datos del cuerpo de la solicitud
  const { Nombre, Cantidad, FechaRegistro, precio } = req.body;

  // Función para formatear la fecha en 'YYYY-MM-DD'
  function formatDate(dateString) {
    if (dateString) {
      return dateString;
    } else {
      console.error('La fecha es undefined o nula.');
      return null; // O manejar de otra manera según tus necesidades
    }
  }

  // Formatear la fecha en el formato 'YYYY-MM-DD'
  const fechaRegistroFormatted = formatDate(FechaRegistro);

  // Crear un objeto ProductosModel con los datos recibidos
  const nuevoProductos = new Productos({
    Nombre,
    Cantidad,
    FechaRegistro: fechaRegistroFormatted,
    precio
  });

  // Guardar el ControlInventario en la base de datos
  Productos.create(nuevoProductos, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el ControlInventario."
      });
    } else {
      res.send(data);
    }
  });
};

// Obtener todos los ControlInventario de la base de datos (con condición).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Productos.getAll(nombre, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar los ControlInventario."
      });
    } else {
      res.send(data);
    }
  });
};

// Obtener un solo ControlInventario por Id
exports.findOne = (req, res) => {
  Productos.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró ControlInventario con el id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar ControlInventario con el id " + req.params.id
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Actualizar un ControlInventario identificado por el nombre en la solicitud
exports.updateByNombre = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
    return;
  }

  // Obtener los datos del cuerpo de la solicitud
  const { Nombre, Cantidad, FechaRegistro, precio } = req.body;

  // Crear un objeto ProductosModel con los datos recibidos
  const ProductosToUpdate = new Productos({
    Nombre,
    Cantidad,
    FechaRegistro,
    precio
  });

  // Actualizar un producto identificado por el nombre
  Productos.updateByNombre(req.params.nombre, ProductosToUpdate, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró producto con el nombre ${req.params.nombre}.`
        });
      } else {
        res.status(500).send({
          message: "Error al actualizar producto con el nombre " + req.params.nombre
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Eliminar un producto con el nombre especificado en la solicitud
exports.delete = (req, res) => {
  const nombre = req.params.nombre;

  Productos.removeByNombre(nombre, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No se encontró producto con el nombre ${nombre}.`,
        });
      } else {
        res.status(500).send({
          message: `Error al eliminar producto con el nombre ${nombre}.`,
        });
      }
    } else {
      res.send({ message: `¡Producto ${nombre} eliminado exitosamente!` });
    }
  });
};

// Eliminar todos los ControlInventario de la base de datos.
exports.deleteAll = (req, res) => {
  Productos.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error al eliminar todos los ControlInventario."
      });
    } else {
      res.send({ message: `¡Todos los ControlInventario fueron eliminados exitosamente!` });
    }
  });
};
