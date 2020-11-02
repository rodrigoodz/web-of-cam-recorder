const testFolder = "./records/";
const fs = require("fs");

const getListaArchivos = () => {
  let archivos = [];
  fs.readdirSync(testFolder).forEach((file) => {
    archivos.push(file);
  });
  return archivos;
};

module.exports = { getListaArchivos };
