const sql = require("../config/db.js");


const Menu = function (menu) {
  this.Imagen = menu.Imagen;
  this.Name = menu.Name;
  this.Description = menu.Description;
  this.Price = menu.Price;
};

Menu.create = (nuevoMenu, result) => {
  sql.query("INSERT INTO Menu SET ?", nuevoMenu, (err, res) => {
    if (err) {
      console.error("Error al crear el menú:", err);
      result(err, null);
      return;
    }
    console.log('Datos recibidos en el servidor:', nuevoMenu);
    console.log("Menú creado: ", { id: res.insertId, ...nuevoMenu });
    result(null, { id: res.insertId, ...nuevoMenu });
  });
};

Menu.updateById = (id, menu, result) => {
  sql.query(
    "UPDATE Menu SET Imagen = ?, Name = ?, Description = ?, Price = ? WHERE ID = ?",
    [menu.Imagen, menu.Name, menu.Description, menu.Price, id],
    (err, res) => {
      if (err) {
        console.error("Error al actualizar el menú:", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 1) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Menú actualizado: ", { id: id, ...menu });
      result(null, { id: id, ...menu });
    }
  );
};

Menu.getAll = (nombre, result) => {
  let query = "SELECT * FROM Menu";
  if (nombre) {
    query += ` WHERE Name LIKE '%${nombre}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.error("Error al obtener los menús:", err);
      result(null, err);
      return;
    }
    console.log("Menús: ", res);
    result(null, res);
  });
};

Menu.remove = (id, result) => {
  sql.query("DELETE FROM Menu WHERE ID = ?", id, (err, res) => {
    if (err) {
      console.error("Error al eliminar el menú:", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Menú eliminado con ID: ", id);
    result(null, res);
  });
};

Menu.removeAll = (result) => {
  sql.query("DELETE FROM Menu", (err, res) => {
    if (err) {
      console.error("Error al eliminar todos los menús:", err);
      result(null, err);
      return;
    }
    console.log(`Eliminados ${res.affectedRows} menús`);
    result(null, res);
  });
};

module.exports = Menu;