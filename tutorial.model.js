const sql = require("../config/db.js");

const Tutorial = function (tutorial) {
  this.nombre = tutorial.nombre;
  this.email = tutorial.email;
  this.contraseña = tutorial.contraseña;
  this.rol = tutorial.rol;
};

Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO LoginUser SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

Tutorial.findById = (id, result) => {
  sql.query(`SELECT * FROM LoginUser WHERE id = ${id,contraseña, nombre,rol,email}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Tutorial.getAll = (nombre, result) => {
  let query = "SELECT * FROM LoginUser";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tutorial.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE LoginUser SET nombre = ?, email = ?, contraseña = ?, rol = ? WHERE id = ?",
    [tutorial.nombre, tutorial.email, tutorial.contraseña, tutorial.rol, id],
    (err, res) => {
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

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Tutorial.remove = (id, result) => {
  sql.query("DELETE FROM LoginUser WHERE id = ?", id, (err, res) => {
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

Tutorial.removeAll = result => {
  sql.query("DELETE FROM LoginUser", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};


// Autenticar usuario por Email y contraseña
Tutorial.authenticate = (email, contraseña, result) => {
  sql.query("SELECT * FROM LoginUser WHERE email = ? AND contraseña = ?", [email, contraseña], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    if (res.length) {
      console.log(res);
      result(null, res[0]);
      return;
    }

    // No se encontró el usuario con el nombre y la contraseña proporcionados
    result(null, null);
  });
};


module.exports = Tutorial;


