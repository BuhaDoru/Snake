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
trail = [];
tail = 1;
let score = document.getElementById("score");

function stopGame () {
    clearInterval(myInterval);
}

function runGame () {
    playerX += xSpeed;
    playerY += ySpeed;
    if (playerX < 0) {
        document.getElementById("Message").innerHTML += `
            <div class="card text-bg-danger mb-3"">
                <div class="card-body">
                    <h5 class="card-title">You lost!</h5>
                </div>
            </div>`;
        stopGame();
    }
    if (playerX > tc - 1) {
        document.getElementById("Message").innerHTML += `
            <div class="card text-bg-danger mb-3"">
                <div class="card-body">
                  <h5 class="card-title">You lost!</h5>
                </div>
            </div>`;
        stopGame();
    }
    if (playerY < 0) {
        document.getElementById("Message").innerHTML += `
              <div class="card text-bg-danger mb-3"">
                <div class="card-body">
                  <h5 class="card-title">You lost!</h5>
                </div>
              </div>`;
        stopGame();
    }
    if (playerY > tc - 1) {
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
    for (var i = 0; i < trail.length; ++i) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        if (trail[i].x == playerX && trail[i].y == playerY && (xSpeed != 0 || ySpeed != 0)) {
            console.log(trail[i].x, playerX, trail[i].y, playerY);
            document.getElementById("Message").innerHTML += `
              <div class="card text-bg-danger mb-3"">
                <div class="card-body">
                  <h5 class="card-title">You lost!</h5>
                </div>
              </div>`;
            stopGame();
        }
    }
    trail.push ({x:playerX, y:playerY});
    while (trail.length > tail) {
        for (let j = 0; j < trail.length; ++j) {
            trail[j] = trail[j + 1];
        }
        trail.pop();
    }
 
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

function restartGame() {
        location.reload();
}
