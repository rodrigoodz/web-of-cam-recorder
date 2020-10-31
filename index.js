const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/public"));

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Configuración global de rutas
app.use(require("./routes/index"));

app.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});
