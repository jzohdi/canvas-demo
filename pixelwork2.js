function init3(canvasID) {
  var canvas = document.getElementById(canvasID);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;

  function furthestWallCorner(x, y) {
    var wallUpRight = {
      distance: Math.round(
        Math.sqrt(
          Math.round(Math.abs(0 - y)) ** 2 +
            Math.round(Math.abs(innerWidth - x)) ** 2
        )
      ),
      direction: "Up"
    };
    var wallDownRight = {
      distance: Math.round(
        Math.sqrt(
          Math.round(Math.abs(innerHeight - y)) ** 2 +
            Math.round(Math.abs(innerWidth - x)) ** 2
        )
      ),
      direction: "Down"
    };
    var wallUpLeft = {
      distance: Math.round(
        Math.sqrt(
          Math.round(Math.abs(0 - y)) ** 2 + Math.round(Math.abs(0 - x)) ** 2
        )
      ),
      direction: "Right"
    };
    var wallDownLeft = {
      distance: Math.round(
        Math.sqrt(
          Math.round(Math.abs(innerHeight - y)) ** 2 +
            Math.round(Math.abs(0 - y)) ** 2
        )
      ),
      direction: "Left"
    };
    if (
      Math.max(
        wallUpRight.distance,
        wallDownRight.distance,
        wallUpLeft.distance,
        wallDownLeft.distance
      ) == wallUpRight.distance
    ) {
      return wallUpRight;
    } else if (
      Math.max(
        wallUpRight.distance,
        wallDownRight.distance,
        wallUpLeft.distance,
        wallDownLeft.distance
      ) == wallDownRight.distance
    ) {
      return wallDownRight;
    } else if (
      Math.max(
        wallUpRight.distance,
        wallDownRight.distance,
        wallUpLeft.distance,
        wallDownLeft.distance
      ) == wallUpLeft.distance
    ) {
      return wallUpLeft;
    } else {
      return wallDownLeft;
    }
  }

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

  var start = false;
  var pixelData = ctx.getImageData(0, 0, innerWidth, innerHeight);
  var pixels = pixelData.data;
  var w = pixelData.width;
  var h = pixelData.height;

  var l = w * h;

  var drops = [];

  function Drip(x, y, maxD) {
    this.x = x;
    this.y = y;
    this.radius = 1;
    this.maxD = maxD + 200;
    this.update = () => {
      this.radius += 5;
    };
  }

  function drawPixels() {
    for (let i = 0; i < l; i++) {
      var y = parseInt(i / w, 10);
      var x = i - y * w;
      let d;
      let color;
      for (let p = 0; p < drops.length; p++) {
        d = getDistance(drops[p].x, drops[p].y, x, y);

        if (d > drops[p].radius + 20) {
          color = (300 * drops[p].radius) / d;
        } else {
          color = 255 - (drops[p].radius - d);
        }
        pixelData.data[i * 4] = color;
        pixelData.data[i * 4 + 1] = color;
        pixelData.data[i * 4 + 2] = color;
      }
    }
    for (let k = 0; k < drops.length; k++) {
      drops[k].update();
      if (drops[k].radius > drops[k].maxD) {
        let out = drops.indexOf(drops[k]);
        drops.splice(out, 1);
      }
    }

    ctx.putImageData(pixelData, 0, 0);
  }
  $("#" + canvasID).on("click touchstart", function() {
    let maxD = furthestWallCorner(event.clientX, event.clientY);
    drops.push(new Drip(event.clientX, event.clientY, maxD.distance));
  });
  function animate() {
    if (window.pxl2) {
      requestAnimationFrame(animate);

      // ctx.fillStyle = "rgba(0, 0, 0, 1)";
      // ctx.fillRect(0, 0, innerWidth, innerHeight);
      drawPixels();
    }
  }
  animate();
}
