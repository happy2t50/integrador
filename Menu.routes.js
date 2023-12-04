// app/routes/Menu.routes.js
const express = require("express");
const multer = require('multer');
const Menu = require("../controllers/Menu.controller.js");
module.exports = app => {
const router = express.Router();
const upload = multer({
  dest: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.jpg`);
  }
});
router.post("/", upload.single('imagen'), (req, res) => {
  const imagen = `/${req.file.path}`;
  
  Menu.create({
    Name: req.body.Name,
    Imagen: imagen,
    Description: req.body.Description,
    Price: req.body.Price
  }, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el menú."
      });
    } else {
      res.send(data);
    }
  });
});

router.get("/", Menu.findAll);
router.get("/:id", Menu.findOne);
router.put("/:id", Menu.update);
router.delete("/:id", Menu.delete);
router.delete("/", Menu.deleteAll);
app.use('/api/Menu', router);
}
