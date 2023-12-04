const express = require("express");
const Ventas = require("../controllers/Ventas.controller.js");

module.exports = (app) => {
  const router = express.Router();
  
  router.post("/", Ventas.create);
  router.get("/", Ventas.getAll);
  router.get("/byDate", Ventas.getByDate); 
  router.delete("/:id", Ventas.deleteById)
  app.use("/api/Ventas", router);
};
