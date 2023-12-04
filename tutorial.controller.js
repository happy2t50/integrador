const Tutorial = require("../models/tutorial.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Obtener los datos del cuerpo de la solicitud
  const { nombre, email, contraseña, rol } = req.body;
 
  // Crear un objeto tutorial con los datos recibidos
  const tutorial = {
    nombre: nombre,
    email: email,
    contraseña: contraseña,
    rol: rol
  };
  
  // Guardar el tutorial en la base de datos
  Tutorial.create(tutorial, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tutorial."
      });
    } else {
      res.send(data);
    }
  });

};



// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Tutorial.getAll(nombre, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single Tutorial by Id
exports.findOne = (req, res) => {
  Tutorial.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.id
        });
      }
    } else {
      res.send(data);
    }
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.getAllPublished((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    } else {
      res.send(data);
    }
  });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const { nombre, email, contraseña, rol } = req.body;

  const tutorial = {
    nombre: nombre,
    email: email,
    contraseña: contraseña,
    rol: rol
  };
  
  Tutorial.updateById(req.params.id, tutorial, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Tutorial with id " + req.params.id
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Tutorial.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id
        });
      }
    } else {
      res.send({ message: `Tutorial was deleted successfully!` });
    }
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all tutorials."
      });
    } else {
      res.send({ message: `All Tutorials were deleted successfully!` });
    }
  });
};
exports.login = (req, res) => {
  const { email, contraseña } = req.body;

  // Verificar si el usuario con el nombre y la contraseña proporcionados existe en la base de datos
  Tutorial.authenticate(email, contraseña, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while authenticating the user."
      });
    } else {
      if (data) {
        res.send({ message: "Login successful", user: data });
      } else {
        res.status(401).send({ message: "Invalid username or password" });
      }
    }
  });
};
