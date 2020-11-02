const fs = require("fs");

const getListaArchivos = (tipo) => {
  if (tipo === 1) {
    ///grabaciones
    let archivos = [];
    fs.readdirSync("./records/").forEach((file) => {
      archivos.push(file);
    });
    return archivos;
  } else if (tipo === 2) {
    ///capturas
    let archivos = [];
    fs.readdirSync("./snapshots/").forEach((file) => {
      archivos.push(file);
    });
    return archivos;
  }
};

module.exports = { getListaArchivos };
