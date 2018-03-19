window.onclick=function(){
    // canvas
    var canvas = document.getElementById("gamecanvas");
    var ctx = canvas.getContext("2d");
    
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    
    // ball
    var radius = 10;
    
    // x and y
    var x = WIDTH/2;
    var y = HEIGHT-30;
    var dx = 2;
    var dy = -2;
    
    // paddle
    var PADDLEHEIGHT = 10;
    var PADDLEWIDTH = 75;
    var pX = (WIDTH-PADDLEWIDTH)/2;
    
    // key ptress
    var rPress = false;
    var lPress = false;
    
    // bricks
    var ROWS = 5;
    var COLS = 7;
    var BWIDTH = 75;
    var BHEIGHT = 20;
    var BPADDING = 10;
    var bTop = 50;
    var bLeft = 30;
    
    var score = 0;
    var LIVES = 3;
    
    

    var bricks = [];
    for(c=0; c<COLS; c++) {
        bricks[c] = [];
        for(r=0; r<ROWS; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
       }
    }
    
    // event listeners for key down & up and mouse movement
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    // key down
    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rPress = true;
        }
        else if(e.keyCode == 37) {
            lPress = true;
        }
    }
    // key up
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rPress = false;
        }
        else if(e.keyCode == 37) {
                lPress = false;
        }
    }
    // mouse move
    function mouseMoveHandler(e) {
        var rX = e.clientX - canvas.offsetLeft;
        if(rX > 0 && rX < WIDTH) {
            pX = rX - PADDLEWIDTH/2;
        }
    }
    
    
    
    // collision
    function detectCollision() {
        for(c=0; c<COLS; c++) {
            for(r=0; r<ROWS; r++) {
                var b = bricks[c][r];
                if(b.status == 1) {
                    if(x > b.x && x < b.x+BWIDTH && y > b.y && y < b.y+BHEIGHT) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score == ROWS*COLS) {
                            alert("YOU WIN, CONGRATS!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    // ball
    function initBall() {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2);
        ctx.fillStyle = "#B9A1E4";
        ctx.fill();
        ctx.closePath();
    }
    
    // paddle
    function initPaddle() {
        ctx.beginPath();
        ctx.rect(pX, HEIGHT-PADDLEHEIGHT, PADDLEWIDTH, PADDLEHEIGHT);
        ctx.fillStyle = "#9A93EC";
        ctx.fill();
        ctx.closePath();
    }
    
    // bricks
    function initBricks() {
        for(c=0; c<COLS; c++) {
            for(r=0; r<ROWS; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(BWIDTH+BPADDING))+bLeft;
                    var brickY = (c*(BHEIGHT+BPADDING))+bTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, BWIDTH, BHEIGHT);
                    ctx.fillStyle = "#A1CCE4";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    
    // score
    function initScoreboard() {
        ctx.font = "bold 20px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+score, 8, 20);
    }
    
    // lives
    function initLives() {
        ctx.font = "bold 20px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: "+LIVES, WIDTH-85, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        initBricks();
        initBall();
        initPaddle();
        initScoreboard();
        initLives();
        detectCollision();
        
    
        // ball hits left or right walls
        if(x + dx > WIDTH-radius || x + dx < radius) {
            dx = -dx;
        }
        // ball hits top wall
        if(y + dy < radius) {
            dy = -dy;
        }
    
        //ball hits bottom
        else if(y + dy > HEIGHT-radius) {
        
            if(x > pX && x < pX + PADDLEWIDTH){
                dy = -dy;
            }
            else {
                LIVES--;
                if(!LIVES) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    x = WIDTH/2;
                    y = HEIGHT-30;
                    dx = 3;
                    dy = -3;
                    pX = (WIDTH-PADDLEWIDTH)/2;
                }
            }
        }
    
        if(rPress && pX < WIDTH-PADDLEWIDTH) {
            pX += 7;
        }
        else if(lPress && pX > 0) {
            pX -= 7;
        }
    
        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }
    draw();}
