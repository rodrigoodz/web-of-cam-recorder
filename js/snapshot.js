const http = require("http");
const fs = require("fs");

const saveSnapshot = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let nombre_archivo = "";
  if (month < 10) {
    nombre_archivo = `${day}.0${month}.${year}_${hour}.${minutes}.${seconds}`;
  } else {
    nombre_archivo = `${day}.${month}.${year}_${hour}.${minutes}.${seconds}`;
  }

  const file = fs.createWriteStream(`./snapshots/${nombre_archivo}.jpg`);
  http.get("http://192.168.0.212:8080/snapshot.jpeg", (response) => {
    response.pipe(file);
  });
};

module.exports = {
  saveSnapshot,
};
