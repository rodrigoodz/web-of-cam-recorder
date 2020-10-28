const date = new Date();

const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hour = date.getHours();
const minutes = date.getMinutes();
const dur_hor = 0;
const dur_min = 0;
const dur_seg = 10;
const duracion = dur_hor * 3600 + dur_min * 60 + dur_seg;
let nombre_archivo = "";

if (month < 10) {
  nombre_archivo = `${day}.0${month}.${year}_${hour}.${minutes}_duracion_${dur_hor}h${dur_min}m${dur_seg}s`;
} else {
  nombre_archivo = `${day}.${month}.${year}_${hour}.${minutes}_duracion_${dur_hor}h${dur_min}m${dur_seg}s`;
}

var spawn = require("child_process").spawn;
var args = `-f mjpeg -framerate 16 -t ${duracion} -i http://192.168.0.212:8080/video.jpeg -vcodec libvpx -framerate 16 -bitrate 256k records/${nombre_archivo}.webm -y`;
//   "-f mjpeg -framerate 1 -i http://192.168.0.212:8080/video.jpeg -vcodec libvpx -framerate 1 -bitrate 256k video_file.webm -y";
//   "-f mjpeg -framerate 16 -t 00:00:10 -i http://192.168.0.212:8080/video.jpeg -vcodec libvpx -framerate 16 -bitrate 256k video_file.webm -y";
console.log(args);
var encoder = spawn("ffmpeg", args.split(" "));
encoder.stderr.pipe(process.stdout);

// setTimeout(() => {
//   process.exit();
// }, 20000);
