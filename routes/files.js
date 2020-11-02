const express = require("express");
const { getListaArchivos } = require("../js/viewFiles");
const app = express();

app.get("/files", function (req, res) {
  const archivos = getListaArchivos();
  res.send(archivos);
});

module.exports = app;
