const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Configuraciones
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());

// Config Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

 




app.get('/api/menus', (req, res) => {
  db.Menu.findAll()
    .then(menus => {
      const menusConUrl = menus.map(menu => {
        return {
          ...menu.dataValues,
          imagen: `http://localhost:8082/uploads/${menu.imagen}`,
        };
      });Ñ

      res.json(menusConUrl);
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Error al obtener los menús'
      });
    });
});

 
require("./app/routes/tutorial.routes")(app);
require("./app/routes/Productos.routes")(app);
require("./app/routes/Menu.routes")(app);
require("./app/routes/Ventas.routes")(app);

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
