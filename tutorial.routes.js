module.exports = app => {
  const LoginUser = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();
  

  // Create a new Tutorial
  router.post("/",LoginUser.create);

  // Retrieve all Tutorials
  router.get("/", LoginUser.findAll);

  // Retrieve all published Tutorials
  router.get("/published", LoginUser.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", LoginUser.findOne);

  // Update a Tutorial with id
  router.put("/:id", LoginUser.update);

  // Delete a Tutorial with id
  router.delete("/:id", LoginUser.delete);

  // Delete all Tutorials
  router.delete("/", LoginUser.deleteAll);
  
  router.post("/login", LoginUser.login);

  app.use('/api/LoginUser', router);
};
