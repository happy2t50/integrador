const sql = require ("../config/db.js");

const Productos = function(Productos) {
  this.Nombre = Productos.Nombre;
  this.Cantidad = Productos.Cantidad;
  this.FechaRegistro = Productos.FechaRegistro;
  this.precio = Productos.precio;
};

Productos.create = (nuevoProductos, result) => {
  sql.query("INSERT INTO Productos SET ?", nuevoProductos, (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(err, null);
      return;
    }
    console.log("Productos creado: ", { id: res.insertId, ...nuevoProductos });
    result(null, { id: res.insertId, ...nuevoProductos });
  });
};

Productos.updateByNombre = (nombre, Productos, result) => {
  sql.query(
    "UPDATE Productos SET Cantidad = ?, FechaRegistro = ?, precio = ? WHERE Nombre = ?",
    [
      Productos.Cantidad,
      Productos.FechaRegistro,
      Productos.precio,
      Productos.Nombre // Cambiado de Nombre a Productos.Nombre
    ],
    (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Producto actualizado por nombre: ", { Nombre: Productos.Nombre, ...Productos });
      result(null, { Nombre: Productos.Nombre, ...Productos });
    }
  );
};

Productos.getAll = (nombre, result) => {
  let query = "SELECT * FROM Productos";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Productos: ", res);
    result(null, res);
  });
};

Productos.remove = (id, result) => {
  sql.query("DELETE FROM Productos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Productos.removeAll = result => {
  sql.query("DELETE FROM Productos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Productos`);
    result(null, res);
  });
};

Productos.removeByNombre = (nombre, result) => {
  sql.query('DELETE FROM Productos WHERE Nombre = ?', nombre, (err, res) => {
    if (err) {
      console.error('Error al eliminar producto por nombre:', err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      // No se encontró un producto con ese nombre
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log(`Producto con nombre ${nombre} eliminado correctamente.`);
    result(null, res);
  });
};

module.exports = Productos;
