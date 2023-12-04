
const sql = require("../config/db.js");

const Ventas = function (venta) {
  this.fecha_venta = venta.fecha_venta;
  this.nombre = venta.nombre;
  this.cantidad = venta.cantidad;
  this.precio_unitario = venta.precio_unitario;
};

Ventas.create = (nuevaVenta, result) => {
  sql.query("INSERT INTO ventas SET ?", nuevaVenta, (err, res) => {
    if (err) {
      console.error("Error al crear la venta:", err);
      result(err, null);
      return;
    }

    console.log("Venta creada:", { id: res.insertId, ...nuevaVenta });
    result(null, { id: res.insertId, ...nuevaVenta });
  });
};

Ventas.getAll = (nombre, result) => {
  let query = "SELECT * FROM Ventas";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Ventas: ", res);
    result(null, res);
  });
};
Ventas.deleteById = (ventaId, result) => {
  sql.query("DELETE FROM ventas WHERE id = ?", [ventaId], (err, res) => {
    if (err) {
      console.error("Error al eliminar la venta:", err);
      result(err, null);
      return;
    }


    if (res.affectedRows === 0) {
      // No se encontró la venta con el ID proporcionado
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Venta eliminada con éxito. ID:", ventaId);
    result(null, res);
  });
};
Ventas.getByDate = (fecha_venta, result) => {
  let query = "SELECT * FROM Ventas";

  if (fecha_venta) {
    query += ` WHERE fecha_venta = '${fecha_venta}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Ventas: ", res);
    result(null, res);
  });
};
module.exports = Ventas;