const { parentPort } = require("worker_threads");
const btoa = require("btoa");
const potrace = require("potrace");
const fs = require("fs");

parentPort.on("message", (data) => {
  trace(data.frame, data.length);
});

function trace(frame, length) {
  // if(!tracer) var tracer = new potrace.Potrace();
  if (!tracer) var tracer = new potrace.Posterizer();
  return tracer.loadImage(`./tmp/${frame}`, (err) => {
    if (err) throw err;
    let path = tracer.getSVG();
    path =
      path.substr(0, 100) + ' preserveAspectRatio="none"' + path.substr(100);
    path = "data:image/svg+xml;base64," + btoa(path);
    let frameNo = parseInt(frame.substr(5, 4)) - 1;
    path =
      (frameNo / length) * 100 +
      '% { background: center / contain no-repeat url("' +
      path +
      '"); }\n';
    frame = frame.substr(0, frame.indexOf(".")) + ".txt";
    fs.writeFileSync(`./tmp/${frame}`, path);
    parentPort.postMessage(frame);
  });
}
