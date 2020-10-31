const express = require("express");

const app = express();

app.use(require("./record"));
//TODO si agrego una nueva ruta agregarla aca con app.use(require("./nombre"));

module.exports = app;
