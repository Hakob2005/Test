
//! Requiring modules  --  START
var Black = require("./modules/BlackThing.js");
var Bomb = require("./modules/Bomber.js");
var Grass = require("./modules/grass.js");
var Predator = require("./modules/predator.js");
var GrassEater = require("./modules/GrassEater");
var allStarter = require("./modules/allStarter.js");
const GameHandler = require("./modules/GameHandler.js");
var random = require("./modules/random.js");
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
BomberArr = [];
BlackArr = [];
matrix = [];
grassHashiv = grassArr.length;
grassEaterCount = grassEaterArr.length;
predatorCount = predatorArr.length;
bomberCount = BomberArr.length;
blackCount = BlackArr.length;
starterArr = [new allStarter()];
//! Setting global arrays  -- END
var MatrixSize = 40



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
matrixGenerator(MatrixSize, 5, 3 , 1 , 8 , 1);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
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

    //Yes()

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCount: grassEaterArr.length,
        predCount: predatorArr.length,
        bomberCount: BomberArr.length,
        blackCount: BlackArr.length,
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}

// function Yes(){
//     for (let y = 0; y < matrix.length; y++) {
//         for (let x = 0; x < matrix[0].length; x++) {
//             if(matrix[y][x] == 2){
//                 if(grassEaterArr.length > 0){
//                     for (const i in grassEaterArr) {
//                         if(grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
//                             break
//                         } else {
//                             if (i == grassEaterArr.length - 1){
//                                 matrix[y][x] = 0;
//                             }
//                         }
//                     }
//                 } else {
//                     matrix[y][x] = 0;
//                 }
//             }
//         }
//     }
// }


function restart() {

    gameData = new GameHandler();
    matrix = [];
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    BomberArr = [];
    BlackArr = [];
    
    matrixGenerator(40, 5, 3 , 1 , 8 , 1);
    creatingObjects()

    let data = {
        matrix: matrix,
        gameData: gameData,
    };

    io.sockets.emit("data", data);


}

function GrassEaterAdd(){
    let number = 10
    for (let i = 0; i < number; i++) {
        let customX = Math.floor(random(MatrixSize));
        let customY = Math.floor(random(MatrixSize));
        matrix[customY][customX] = 2;
        var grassEater = new GrassEater(customX, customY);
        grassEaterArr.push(grassEater);
    }

    

    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCount: grassEaterArr.length
    }

    game()

    io.sockets.emit("data", sendData);
}

io.on('connection', function (socket) {
    socket.on("restart", restart);
    socket.on("AddGrass", GrassEaterAdd);
});

setInterval(game, 250)