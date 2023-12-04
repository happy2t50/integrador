// Productos.routes.js

const Productos = require("../controllers/Productos.controller.js");

module.exports = app => {
  var router = require("express").Router();

  // Create a new ControlInventario
  router.post("/", Productos.create);

  // Retrieve all ControlInventario
  router.get("/", Productos.findAll);

  // Retrieve a single ControlInventario with id
  router.get("/:id", Productos.findOne);

  router.put('/:Nombre', Productos.updateByNombre);



  // Delete a ControlInventario with id
  router.delete("/:nombre", Productos.delete);

  // Delete all ControlInventario
  router.delete("/", Productos.deleteAll);



  app.use('/api/Productos', router);
};
