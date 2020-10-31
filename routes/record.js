const express = require("express");
const { record } = require("../js/recorder");
const app = express();

app.post("/record", function (req, res) {
  const body = req.body;
  // console.log("body ", body.input_horas);
  // console.log("body ", body.input_minutos);
  // console.log("body ", body.input_segundos);
  record(body.input_horas, body.input_minutos, body.input_segundos);
  res.json({ ok: true });
});

module.exports = app;
