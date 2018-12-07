function init2() {
  var canvas = document.getElementById("map-canvas3");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;

  function getColorIndicesForCoord(x, y, width) {
    var red = y * (width * 4) + x * 4;
    return [red, red + 1, red + 2, red + 3];
  }
  function getPixelNFromXY(x, y) {
    return y * canvas.width + x;
  }

  const getDistance = (x1, y1, x2, y2) => {
    let a = x1 - x2;
    let b = y1 - y2;
    return Math.sqrt(a * a + b * b);
  };
  //   var colorIndices = getColorIndicesForCoord(xCoord, yCoord, canvasWidth);

  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  var pixelData = ctx.getImageData(0, 0, innerWidth, innerHeight);
  var pixels = pixelData.data;
  var w = pixelData.width;
  var h = pixelData.height;

  var l = w * h;
  var radius = 1;

  function drawPixels() {
    for (let i = 0; i < l; i++) {
      var y = parseInt(i / w, 10);
      var x = i - y * w;
      let d = getDistance(centerX, centerY, x, y);
      let color = ((1000 * radius) / d) % 255;
      pixelData.data[i * 4] = color;
      pixelData.data[i * 4 + 1] = color;
      pixelData.data[i * 4 + 2] = color;
    }

    ctx.putImageData(pixelData, 0, 0);
    radius += 1;
  }

  drawPixels();

  function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    drawPixels();
  }

  animate();
}
