const Ventas = require("../models/Ventas.model.js");

exports.create = (req, res) => {
  const nuevaVenta = new Ventas({
    fecha_venta: new Date(), // Fecha actual
    nombre: req.body.nombre,
    cantidad: parseInt(req.body.cantidad), // Convertir a número entero
    precio_unitario: parseFloat(req.body.precio_unitario), // Convertir a número decimal
  });

  Ventas.create(nuevaVenta, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear la venta.",
      });
    } else {
      res.send(data);
    }
  });
};
exports.deleteById = (req, res) => {
  const { id } = req.params;

  sql.query("DELETE FROM ventas WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).send({
        message: "Error al eliminar la venta."
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({
        message: `No se encontró la venta con el ID ${id}.`
      });
    }

    console.log("Venta eliminada con éxito. ID:", id);
    res.status(200).send({
      message: "Venta eliminada exitosamente."
    });
  });
};

exports.getAll = (req, res) => {
  Ventas.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar los datos de ventas :)."
      });
    } else {
      res.send(data);
    }
  });
};
exports.getByDate = (req, res) => {
  const { fecha_venta } = req.query;

  Ventas.getByDate(fecha_venta, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar las ventas por fecha."
      });
    } else {
      res.send(data);
    }
  });
};