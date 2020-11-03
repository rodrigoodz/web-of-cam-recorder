const fs = require("fs");
const path = require("path");

const getListaArchivos = (tipo) => {
  if (tipo === 1) {
    ///grabaciones
    let archivos = [];
    fs.readdirSync(path.resolve(__dirname + "/../public/records")).forEach(
      (file) => {
        archivos.push(file);
      }
    );
    return archivos;
  } else if (tipo === 2) {
    ///capturas
    let archivos = [];
    fs.readdirSync(path.resolve(__dirname + "/../public/snapshots")).forEach(
      (file) => {
        archivos.push(file);
      }
    );
    return archivos;
  }
};

module.exports = { getListaArchivos };
