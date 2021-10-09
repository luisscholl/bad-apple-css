# Bad Apple!! MP4 to pure CSS converter

This converter is written for playing the [Bad Apple!! PV](https://youtu.be/FtutLA63Cp8) using pure CSS.

See it [here on YouTube](https://youtu.be/pl57fXuotOM).

To see it in your own browser, clone the repository, follow the installation and usage steps and open the index.html in a Chromium based browser, e.g. Chrome. (Firefox flickers. Once I got a CDN in place, the content delivery might be fast enough to put a link here. The CSS file is no longer hosted in Git, because I do not want to pay for LFS bandwidth.)

## Installation

1. Install Node.js
2. Install ffmpeg
3. ```npm install```

## Usage

1. Place mp4 file, which you want to convert in this folder and rename it to "src.mp4"
2. Adjust the duration in index.js:5 to the duration of the video, if your source file is not the Bad Apple!! PV.
3. Adjust the thread pool size in index.js:26 to the number of threads, which you want to use.
4. ```npm start```