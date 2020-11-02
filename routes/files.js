const express = require("express");
const { getListaArchivos } = require("../js/viewFiles");
const app = express();

app.get("/recordsFiles", function (req, res) {
  const archivos = getListaArchivos(1);
  res.send(archivos);
});

app.get("/snapshotsFiles", function (req, res) {
  const archivos = getListaArchivos(2);
  res.send(archivos);
});

module.exports = app;
