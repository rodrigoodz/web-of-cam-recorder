//boton grabaciones
$("#ver-grabaciones").click(function () {
  getArchivosVideos();
});

//boton capturas
$("#ver-capturas").click(function () {
  getArchivosCapturas();
});

///logica del boton sacar captura
$(".botonSnapshot").click(function () {
  sacarCaptura();
});

//al tocar la tabla grabaciones, debo saber que grabacion se toco
$(".tabla-grabaciones").click(function (e) {
  var elemento = e.target;
  mostrarMedia($(elemento).text(), 1);
});

//al tocar la tabla capturas, debo saber que archivo se toco
$(".tabla-capturas").click(function (e) {
  var elemento = e.target;
  mostrarMedia($(elemento).text(), 2);
});

//cerrar image viewer
$("#image-viewer .close").click(function () {
  $("#image-viewer").hide();
});

//cerrar video viewer
$("#video-viewer .close").click(function () {
  $("#video-viewer").hide();
});

//mostrar imagen
const mostrarMedia = (nombre, tipo) => {
  if (tipo === 1) {
    ///grabacion
    $("#full-video source").attr("src", "./records/" + nombre);
    $("#video-viewer").show();
  } else {
    ///imagen
    $("#full-image").attr("src", "./snapshots/" + nombre);
    $("#image-viewer").show();
  }
};

//logica del boton de grabacion
$("#recButton").addClass("notRec");
$(".botonRec").click(function () {
  if ($("#recButton").hasClass("notRec")) {
    const input_horas = $(".input-horas").val();
    const input_minutos = $(".input-minutos").val();
    const input_segundos = $(".input-segundos").val();
    if (evaluarCampos(input_horas, input_minutos, input_segundos)) {
      $(".texto-grabacion").text("Grabando...");
      $("#recButton").removeClass("notRec");
      $("#recButton").addClass("Rec");
      deshabilitarInputs();
      iniciarCuentaRegresiva(input_horas, input_minutos, input_segundos);
      grabar(input_horas, input_minutos, input_segundos);
      //TODO desahilitar los inputs hasta que se deje de grabar
    }
  } else {
    //si ya estaba grabando
    $(".texto-grabacion").text("Iniciar Grabacion");
    $("#recButton").removeClass("Rec");
    $("#recButton").addClass("notRec");
  }
});
//fin logica boton grabacion

///limpio los inputs
const limpiarCampos = () => {
  $(".input-horas").val("");
  $(".input-minutos").val("");
  $(".input-segundos").val("");
};

///POST -> llamo a snapshot en el server para sacar captura
const sacarCaptura = () => {
  $.ajax({
    type: "POST",
    url: "http://192.168.0.75:3000/snapshot",
    success: function (response) {
      console.log(response);
    },
    error: function (xhr, status, err) {
      console.log(xhr.responseText);
    },
  });
};

///POST -> envios h,m,s y en el server llamaré a funcion recorder
const grabar = (input_horas, input_minutos, input_segundos) => {
  $.ajax({
    type: "POST",
    url: "http://192.168.0.75:3000/record",
    data: {
      input_horas,
      input_minutos,
      input_segundos,
    },
    datatype: "json",
    success: function (response) {
      console.log(response);
    },
    error: function (xhr, status, err) {
      console.log(xhr.responseText);
    },
  });
};

///GET -> traer archivos de video
const getArchivosVideos = () => {
  const x = $.ajax({
    type: "GET",
    url: "http://192.168.0.75:3000/recordsFiles",
    success: function (response) {
      // console.log(response);
    },
    error: function (xhr, status, err) {
      console.log(xhr.responseText);
    },
  }).then((data) => {
    // console.log(data);
    mostrarArchivos(data, "Grabaciones");
  });
};

//GET -> traer capturas
const getArchivosCapturas = () => {
  const x = $.ajax({
    type: "GET",
    url: "http://192.168.0.75:3000/snapshotsFiles",
    success: function (response) {
      // console.log(response);
    },
    error: function (xhr, status, err) {
      console.log(xhr.responseText);
    },
  }).then((data) => {
    // console.log(data);
    mostrarArchivos(data, "Capturas");
  });
};

//TODO crear una peticion para que deje de grabar del lado servidor

///comprobaciones para saber si los campos estan vacios o estan en un rango
const evaluarCampos = (input_horas, input_minutos, input_segundos) => {
  let bandera = true;

  //   input horas
  if (
    input_horas.length === 0 ||
    input_minutos.length === 0 ||
    input_segundos.length === 0
  ) {
    bandera = false;
    alert("Todos los campos deben estar completos");
  }
  if (input_horas > 24 || input_horas < 0) {
    bandera = false;
    alert("Las horas de grabacion deben estar en el rango [0,24]");
  }

  //   input minutos
  if (input_minutos > 60 || input_minutos < 0) {
    bandera = false;
    alert("Los minutos de grabacion deben estar en el rango [0,60]");
  }

  //   input segundos
  if (input_segundos > 60 || input_segundos < 0) {
    bandera = false;
    alert("Los segundos de grabacion deben estar en el rango [0,60]");
  }

  return bandera;
};

///deshabilitar y habilitar input, util usarlo mientras grabo
const deshabilitarInputs = () => {
  $("input[type='number']").prop("disabled", true);
};

const habilitarInputs = () => {
  $("input[type='number']").prop("disabled", false);
};

///cuenta regresiva segun tiempos puestos en los inputs
const iniciarCuentaRegresiva = (input_horas, input_minutos, input_segundos) => {
  ///hago que aparezca el div timeout
  $("#timeout-text").removeClass("d-none");
  $("#timeout-text").addClass("d-inline");

  ///seteo una fucha futura
  let dt = new Date();
  dt.setHours(dt.getHours() + parseInt(input_horas));
  dt.setMinutes(dt.getMinutes() + parseInt(input_minutos));
  dt.setSeconds(dt.getSeconds() + parseInt(input_segundos));

  let x = setInterval(() => {
    ///fecha actual
    const ahora = new Date().getTime();
    ///resto fecha futura menos la actual
    let dif = dt - ahora;

    let horas = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    horas = horas < 10 ? "0" + String(horas) : horas;
    let minutos = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
    minutos = minutos < 10 ? "0" + String(minutos) : minutos;
    let segundos = Math.floor((dif % (1000 * 60)) / 1000);
    segundos = segundos < 10 ? "0" + String(segundos) : segundos;

    //muestro
    $("#timeout-text").text(`${horas}:${minutos}:${segundos}`);

    if (dif < 0) {
      clearInterval(x);
      //habilito input y hago desaparecer el texto de timeout
      habilitarInputs();
      $("#timeout-text").removeClass("d-inline");
      $("#timeout-text").addClass("d-none");
      //vuelvo al estado anterior del boton
      $(".texto-grabacion").text("Iniciar Grabacion");
      $("#recButton").removeClass("Rec");
      $("#recButton").addClass("notRec");
      ///mostrar toast
      $(".toast").toast("show");
    }
  }, 1000);
};

//mostrar archivos en tabla grabaciones o en tabla capturas
const mostrarArchivos = (archivos, tipo) => {
  if (tipo === "Grabaciones") {
    //limpio por si hay algo
    $(".tabla-grabaciones tbody").html(" ");
    //agrego lista archivos
    archivos.forEach((archivo) => {
      $(".tabla-grabaciones tbody").append(`<tr><td>${archivo}</td></tr>`);
    });
  } else if (tipo === "Capturas") {
    $(".tabla-capturas tbody").html(" ");
    archivos.forEach((archivo) => {
      $(".tabla-capturas tbody").append(`<tr><td>${archivo}</td></tr>`);
    });
  }
};
