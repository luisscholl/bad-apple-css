const { exec } = require("child_process");
const fs = require("fs");
const { StaticPool } = require("node-worker-threads-pool");

const duration = "219s";

let frames;
let processedFrames = 0;

if (fs.existsSync("./tmp")) {
  fs.rmdirSync("./tmp", { recursive: true });
}
fs.mkdirSync("./tmp");

exec("ffmpeg -i src.mp4 tmp/frame%04d.jpg", async (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);

  frames = fs.readdirSync("./tmp");

  const pool = new StaticPool({
    size: 12,
    task: "./worker.js",
  });
  for (let frame of frames) {
    pool.exec({ frame: frame, length: frames.length }).then((frame) => {
      processedFrames++;
      console.log(`Processed frame ${frame} -> ${processedFrames} / ${frames.length} frames processed.`);
      if (processedFrames === frames.length) compositeStylesheet();
    });
  }
});

function compositeStylesheet() {
  let animation = "";
  animation += "body {\n";
  animation += "  margin: 0;\n";
  animation += "  overflow: hidden;\n";
  animation += "}\n";
  animation += "\n";
  animation += "#display {\n";
  animation += "  width: 100%;\n";
  animation += "  height: 100%;\n";
  animation += "  will-change: background;\n";
  animation += `  animation: bad-apple ${duration};\n`;
  animation += "}\n\n";
  animation += "@keyframes bad-apple {\n";
  for (let frame of frames) {
    frame = frame.substr(0, frame.indexOf(".")) + ".txt";
    animation += fs.readFileSync(`./tmp/${frame}`);
  }
  animation += "}";
  fs.writeFileSync("./bad-apple.css", animation);
  console.log("Written to bad-apple.css.\nCleaning up...");
  fs.rmdirSync("./tmp", { recursive: true });
}