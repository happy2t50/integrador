const Menu = require("../models/Menu.model.js");

// Crear y guardar un nuevo menú
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
    return;
  }

  const { Imagen, Name, Description, Price } = req.body;

  const nuevoMenu = new Menu({
    Imagen,
    Name,
    Description,
    Price
  });

  Menu.create(nuevoMenu, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el menú."
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Menu.getAll(nombre, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar los menús."
      });
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  Menu.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró menú con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar menú con el ID " + req.params.id
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
    return;
  }

  const { Imagen, Name, Description, Price } = req.body;

  const menuToUpdate = new Menu({
    Imagen,
    Name,
    Description,
    Price
  });

  Menu.updateById(req.params.id, menuToUpdate, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró menú con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al actualizar menú con el ID " + req.params.id
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.delete = (req, res) => {
  Menu.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró menú con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar menú con el ID " + req.params.id
        });
      }
    } else {
      res.send({ message: `¡Menú fue eliminado exitosamente!` });
    }
  });
};

exports.deleteAll = (req, res) => {
  Menu.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error al eliminar todos los menús."
      });
    } else {
      res.send({ message: `¡Todos los menús fueron eliminados exitosamente!` });
    }
  });
};
