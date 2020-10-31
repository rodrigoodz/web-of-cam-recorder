const { kill } = require("process");

let spawn = require("child_process").spawn;

const record = (dur_hor, dur_min, dur_seg) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const duracion = dur_hor * 3600 + dur_min * 60 + dur_seg;

  let nombre_archivo = "";
  if (month < 10) {
    nombre_archivo = `${day}.0${month}.${year}_${hour}.${minutes}_duracion_${dur_hor}h${dur_min}m${dur_seg}s`;
  } else {
    nombre_archivo = `${day}.${month}.${year}_${hour}.${minutes}_duracion_${dur_hor}h${dur_min}m${dur_seg}s`;
  }

  let args = `-f mjpeg -framerate 16 -t ${duracion} -i http://192.168.0.212:8080/video.jpeg -vcodec libvpx -vf drawbox=x=279:y=339:color=black@0.8:width=iw:height=48:t=fill,drawtext=fontsize=20:fontfile=c:/windows/fonts/arial.ttf:text='%{localtime}':fontcolor=white@0.8:x=280:y=340 -framerate 16 -bitrate 256k records/${nombre_archivo}.webm -y`;

  // console.log(args);
  let encoder = spawn("ffmpeg", args.split(" "));
  encoder.stderr.pipe(process.stdout); //estoy mostrando...
};

const stopRecord = () => {
  spawn("taskkill", ["/IM", "ffmpeg.exe", "/F"]);
};

module.exports = {
  record,
  stopRecord,
};

//   "-f mjpeg -framerate 1 -i http://192.168.0.212:8080/video.jpeg -vcodec libvpx -framerate 1 -bitrate 256k video_file.webm -y";
//   "-f mjpeg -framerate 16 -t 00:00:10 -i http://192.168.0.212:8080/video.jpeg -vcodec libvpx -framerate 16 -bitrate 256k video_file.webm -y";
// let args = `-f mjpeg -framerate 16 -t ${duracion} -i http://192.168.0.212:8080/video.jpeg -vcodec libx264 -vf drawbox=x=279:y=339:color=black@0.8:width=iw:height=48:t=fill,drawtext=fontsize=20:fontfile=c:/windows/fonts/arial.ttf:text='%{localtime}':fontcolor=white@0.8:x=280:y=340 -framerate 16 -bitrate 256k records/${nombre_archivo}.mp4 -y`;
