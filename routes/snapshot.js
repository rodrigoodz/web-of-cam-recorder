const express = require("express");
const { saveSnapshot } = require("../js/snapshot");
const app = express();

app.post("/snapshot", function (req, res) {
  saveSnapshot();
  res.json({ ok: true });
});

module.exports = app;
