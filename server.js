
//! Requiring modules  --  START
var Black = require("./modules/BlackThing.js");
var Bomb = require("./modules/Bomber.js");
var Grass = require("./modules/grass.js");
var Predator = require("./modules/predator.js");
var GrassEater = require("./modules/xotaker.js");
var allStarter = require("./modules/allstarter.js");
var random = require("./modules/random.js");
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
BomberArr = [];
BlackArr = [];
matrix = [];
grassHashiv = 0;
Herbivore = 0;
PredatorCount = 0;
starterArr = [new allStarter()];
//! Setting global arrays  -- END



//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predatorArr , BomberArr , BlackArr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predatorArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < BomberArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < BlackArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(40, 5, 3 , 1 , 8 , 1);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
const { start } = require("repl");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log("Server is running!");
});
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if (matrix[y][x] == 3) {
                var grassEater = new Predator(x, y);
                predatorArr.push(grassEater);
            } else if (matrix[y][x] == 4) {
                var Bomber = new Bomb(x, y);
                BomberArr.push(Bomber);
            } else if (matrix[y][x] == 5) {
                var BlackThing = new Black(x, y);
                BlackArr.push(BlackThing);
            }
        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].move();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].move();
        }
    }
    if (BomberArr[0] !== undefined) {
        for (var i in BomberArr) {
            BomberArr[i].checker();
        }
    }
    if (BlackArr[0] !== undefined) {
        for (var i in BlackArr) {
            BlackArr[i].move();
        }
    }
    if (starterArr[0] !== undefined) {
        for (var i in starterArr) {
            starterArr[i].starterr();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCount: grassEaterArr.length
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}

function Yes(){
    if (grassEaterArr[0] !== undefined) {
        grassEaterArr.forEach(function(i){
            if (i.getEnergy() <= 4) {
                i.die()
            }
        })
    }
}

setInterval(Yes, 100)
setInterval(game, 100)