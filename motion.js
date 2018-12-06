function init() {
  var canvas = document.getElementById("map-canvas2");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var cb = canvas.getContext("2d");

  function randomIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var mouse = {
    x: undefined,
    y: undefined
  };

  document
    .getElementById("map-canvas2")
    .addEventListener("mousemove", function() {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

  function Particle(x, y, radius, color) {
    this.centerx = x;
    this.centery = y;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.008;
    this.path = randomIntRange(150, 400);

    this.draw = function() {
      cb.beginPath();
      cb.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      cb.fillStyle = this.color;
      cb.fill();
      cb.closePath();
    };

    this.update = function() {
      this.radians += this.velocity;
      this.x = this.centerx + Math.cos(this.radians) * this.path;
      this.y = this.centery + Math.sin(this.radians) * this.path;

      if (
        mouse.x >= 20 &&
        mouse.x <= innerWidth - 20 &&
        mouse.y >= 20 &&
        mouse.y <= innerHeight - 20
      ) {
        if (this.centerx >= mouse.x + 5) {
          this.centerx -= 2;
        }
        if (this.centerx <= mouse.x - 5) {
          this.centerx += 2;
        }
        if (this.centery >= mouse.y + 5) {
          this.centery -= 2;
        }
        if (this.centery <= mouse.y - 5) {
          this.centery += 2;
        }
        this.centerx = mouse.x;
        this.centery = mouse.y;
      } else {
        if (this.centerx >= innerWidth / 2 + 2) {
          this.centerx /= 1.01;
        }
        if (this.centerx <= innerWidth / 2 - 2) {
          this.centerx *= 1.01;
        }
        // this.centerx = innerWidth / 2;
        if (this.centery >= innerHeight / 2 + 2) {
          this.centery /= 1.01;
        }
        if (this.centery <= innerHeight / 2 - 2) {
          this.centery *= 1.01;
        }
      }
      this.draw();
    };
  }
  var particles = [];

  function init1() {
    for (var i = 0; i < 200; i++) {
      particles.push(new Particle(innerWidth / 2, innerHeight / 2, 5, "blue"));
    }
  }

  init1();

  function animate() {
    requestAnimationFrame(animate);
    // cb.clearRect(0, 0, innerWidth, innerHeight);
    cb.fillStyle = "rgba(255, 255, 255, 0.05)";
    cb.fillRect(0, 0, innerWidth, innerHeight);
    for (var n = 0; n < particles.length; n++) {
      particles[n].update();
    }
  }

  animate();
}
