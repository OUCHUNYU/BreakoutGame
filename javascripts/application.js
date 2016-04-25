var paddle;
var ball;
var bricks = [];

// setup all elements
function layout() {
  GameArea.start();
}

// Game starter
function start() {
  paddle = new Paddle(150, 10, "black", 0, 650);
  for (var r = 0; r < 200; r += 40) {
    for(var c = 0; c < 1200; c += 100) {
      bricks.push(new Brick(80, 30, "green", c + 10, r + 10));
    }
  }
  ball = new Ball();
}

// draw canvas
var GameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 1200;
    this.canvas.height = 700;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 10);
    //calling updateGameArea every 20th milsecond
    window.addEventListener('mousemove', function (e) {
        GameArea.x = e.pageX;
        GameArea.y = e.pageY;
    })
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};


// Making a paddle
function Paddle(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = GameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}


// making bricks
function Brick(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = GameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

// making a ball
function Ball() {
  this.dx = 3;
  this.dy = -3;
  this.x = 200;
  this.y = 630;
  this.update = function() {
    if (this.x + this.dx > 1200 || this.x + this.dx < 0) {
      this.dx = -this.dx;
    }
    if(this.y + this.dy < 0) {
      this.dy = -this.dy;
    }else if((this.x > paddle.x && this.x <= paddle.x + paddle.width) && (this.y < paddle.y + paddle.height && this.y >= paddle.y - 18)) {
        this.dy = -this.dy;
    }else if(this.y + this.dy > 700) {
      clearInterval(GameArea.interval);
      }
    this.x += this.dx;
    this.y += this.dy;
    ctx = GameArea.context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 20, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();
  };
}


// animation
function updateGameArea() {
  GameArea.clear();
  if(GameArea.x && GameArea.y) {
    paddle.x = GameArea.x;
  }

  ball.update();
  paddle.update();
  bricks.forEach(function(brick) { brick.update(); })
}
