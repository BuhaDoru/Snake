window.onload = function () {
    canv = document.getElementById("snake");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    myInterval = setInterval(runGame, 2000/10);
}

playerX = playerY = 10;
gs = tc = 25;
appleX = appleY = 15;
xSpeed = ySpeed = 0;
xTrail = [];
yTrail = [];
tail = 1;
let score = document.getElementById("score");

function stopGame () {
    clearInterval(myInterval);
}

function runGame () {
    playerX += xSpeed;
    playerY += ySpeed;
    if ((playerX < 0) || (playerX > tc - 1) || (playerY < 0) || (playerY > tc - 1)) {
        document.getElementById("Message").innerHTML += `
            <div class="card text-bg-danger mb-3"">
                <div class="card-body">
                    <h5 class="card-title">You lost!</h5>
                </div>
            </div>`;
        stopGame();
    }
    ctx.fillStyle = "black";
    ctx.fillRect (0, 0, canv.width, canv.height);
    ctx.fillStyle = "green";
    for (var i = 0; i < xTrail.length; ++i) {
        ctx.fillRect(xTrail[i] * gs, yTrail[i] * gs, gs - 2, gs - 2);
        if (xTrail[i] == playerX && yTrail[i] == playerY && (xSpeed != 0 || ySpeed != 0)) {
            document.getElementById("Message").innerHTML += `
              <div class="card text-bg-danger mb-3"">
                <div class="card-body">
                  <h5 class="card-title">You lost!</h5>
                </div>
              </div>`;
            stopGame();
        }
    }
    
    moveSnake();
    if (appleX == playerX && appleY == playerY) {
        ++tail;
        score.innerHTML = "Score: " + tail;
        appleX = Math.floor(Math.random() * tc);
        appleY = Math.floor(Math.random() * tc);
    }
    ctx.fillStyle = "red";
    ctx.fillRect (appleX * gs, appleY * gs, gs - 2, gs - 2);
}

function keyPush (evt) {
    if (evt.keyCode == 37) {
        xSpeed = -1; ySpeed = 0;
    } else if (evt.keyCode == 38) {
        xSpeed = 0; ySpeed = -1;
    } else if (evt.keyCode == 39) {
        xSpeed = 1; ySpeed = 0;
    } else if (evt.keyCode == 40) {
        xSpeed = 0; ySpeed = 1;
    }
}

function moveSnake() {
     xTrail[xTrail.length] = playerX;
    yTrail[yTrail.length] = playerY;
    while (xTrail.length > tail) {
        for (let j = 0; j < xTrail.length; ++j) {
            xTrail[j] = xTrail[j + 1];
            yTrail[j] = yTrail[j + 1];
        }
        xTrail.pop();
        yTrail.pop();
    }
}

function restartGame() {
        location.reload();
}
