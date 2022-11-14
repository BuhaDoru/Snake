
window.onload = function () {
    canv = document.getElementById("snake");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    setInterval(game, 2000/10);
}

px = py = 1;
gs = tc = 25;
ax = ay = 10;
xv = yv = 0;
trail = [];
tail = 1;

function game () {
    px += xv;
    py += yv;
    if (px < -1) {
        //alert("game over");
        //px = tc;
    }
    if (px > tc) {
        //alert("game over");
        //px = 0;
    }
    if (py < -1) {
        //alert("game over");
        //py = tc;
    }
    if (py > tc) {
        //alert("game over");
        //py = 0;
    }
    ctx.fillStyle = "black";
    ctx.fillRect (0, 0, canv.width, canv.height);
    ctx.fillStyle = "green";
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * 25,trail[i].y * 25, gs - 2, gs - 2);
        if (trail[i].x == px && trail[i].y == py) {
            //alert("game over");
        }
    }
    trail.push ({x:px, y:py});
    while (trail.length > tail) {
        trail.shift ();
    }
 
    if(ax == px && ay == py) {
        tail++;
        ax = Math.floor(Math.random() * 25);
        ay = Math.floor(Math.random() * 25);
    }
    ctx.fillStyle = "red";
    ctx.fillRect (ax * gs, ay * gs, gs - 2, gs - 2);
}
function keyPush (evt) {
    if (evt.keyCode == 37) {
        xv = -1; yv = 0;
    } else if (evt.keyCode == 38) {
        xv = 0; yv = -1;
    } else if (evt.keyCode == 39) {
        xv = 1; yv = 0;
    } else if (evt.keyCode == 40) {
        xv = 0; yv = 1;
    }
}
