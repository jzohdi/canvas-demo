function initO(canvasId) {
  var canvas = document.getElementById(canvasId);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;

  var cb = canvas.getContext("2d");

  // $("#add-styles").append(
  //   "#right{transform:translate(" +
  //     -20 +
  //     "px," +
  //     (-centerY).toString() +
  //     "px);float:right;}#left{transform:translate(" +
  //     20 +
  //     "px," +
  //     (-centerY).toString() +
  //     "px); float:left;}"
  // );
  function randomIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  var canvasOptions = [
    "<canvas id='map-canvas'></canvas>",
    "<canvas id='map-canvas2'></canvas>",
    "<canvas id ='map-canvas3'></canvas>",
    "<canvas id='map-canvas4'></canvas>"
  ];
  var currentCanvas = 0;
  // var scriptsOptions = [initO(), init()];
  document.getElementById("right").addEventListener("click", function() {
    setNewCanvas(1);
  });

  document.getElementById("left").addEventListener("click", function() {
    setNewCanvas(-1);
  });

  function setNewCanvas(num) {
    let index = Math.abs(currentCanvas + num) % canvasOptions.length;
    currentCanvas = index;

    $("#new-canvas").empty();
    $("#new-canvas").append(canvasOptions[index]);
    let $scripts = $("#scripts");
    $scripts.empty();

    if (index == 1) {
      $scripts.append(init("map-canvas2"));
    }
    if (index == 0) {
      $scripts.append(initO("map-canvas"));
    }
    if (index == 2) {
      $scripts.append(init2("map-canvas3"));
    }
    if (index == 3) {
      window.pxl2 = true;
      $scripts.append(init3("map-canvas4"));
    }
  }
  cb.fillStyle = "black";
  cb.fillRect(0, 0, innerWidth, innerHeight);

  function Proton(offsetX, offsetY, radius, color) {
    this.x = centerX + offsetX;
    this.y = centerY + offsetY;
    this.radius = radius;
    this.color = color;

    this.draw = function() {
      cb.beginPath();
      cb.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      cb.fillStyle = this.color;
      cb.fill();
      cb.closePath();
    };
  }

  function Electrons(offsetX, offsetY, radius, color) {
    this.centerx = centerX;
    this.centery = centerY;
    this.x = centerX + offsetX;
    this.y = centerY + offsetY;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.015;
    this.path = randomIntRange(150, 400);
    this.angle1 =
      (Math.random() * (1.0 - 0.3) + 0.3).toFixed(4) *
      (Math.floor(Math.random() * 2) == 1 ? 1 : -1);
    this.angle2 =
      (Math.random() * (1.0 - 0.3) + 0.3).toFixed(4) *
      (Math.floor(Math.random() * 2) == 1 ? 1 : -1);

    this.draw = function() {
      cb.beginPath();
      cb.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      cb.fillStyle = this.color;
      cb.fill();
      cb.closePath();
    };

    this.update = function() {
      this.radians += this.velocity;

      this.x = this.centerx + Math.cos(this.radians) * this.path * this.angle1;
      this.y = this.centery + Math.sin(this.radians) * this.path * this.angle2;

      this.draw();
    };
  }

  var neuclius = [
    new Proton(7, 7, 10, "grey"),
    new Proton(-7, -7, 10, "grey"),
    new Proton(7, -7, 10, "white"),
    new Proton(-7, 7, 10, "white"),
    new Proton(0, 0, 10, "grey")
  ];

  var electron_arr = [];
  for (let x = 0; x < 100; x++) {
    electron_arr.push(
      new Electrons(
        randomIntRange(50, 100),
        randomIntRange(50, 100),
        3,
        "white"
      )
    );
  }

  document.getElementById(canvasId).addEventListener("click", function() {
    electron_arr.forEach(function(ele) {
      ele.velocity *= -1;
    });
  });

  function animate() {
    if (document.getElementById(canvasId) != undefined) {
      requestAnimationFrame(animate);

      cb.fillStyle = "rgba(0, 0, 0, 0.05)";
      cb.fillRect(0, 0, innerWidth, innerHeight);

      neuclius.forEach(function(element) {
        element.draw();
      });

      electron_arr.forEach(function(element) {
        element.update();
      });
    }
  }
  animate();
}
