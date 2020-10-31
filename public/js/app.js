$("#recButton").addClass("notRec");

$("#recButton").click(function () {
  if ($("#recButton").hasClass("notRec")) {
    const input_horas = $(".input-horas").val();
    const input_minutos = $(".input-minutos").val();
    const input_segundos = $(".input-segundos").val();
    if (evaluarCampos(input_horas, input_minutos, input_segundos)) {
      grabar(input_horas, input_minutos, input_segundos);
      //TODO desahilitar los inputs hasta que se deje de grabar
      //TODO ver como conecto esto de lado server con el cliente
      $(".texto-grabacion").text("Grabando...");
      $("#recButton").removeClass("notRec");
      $("#recButton").addClass("Rec");
    }
  } else {
    //si ya estaba grabando

    $(".texto-grabacion").text("Iniciar Grabacion");
    $("#recButton").removeClass("Rec");
    $("#recButton").addClass("notRec");
  }
});

const limpiarCampos = () => {
  $(".input-horas").val("");
  $(".input-minutos").val("");
  $(".input-segundos").val("");
};

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

//TODO crear una peticion para que deje de grabar del lado servidor

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
