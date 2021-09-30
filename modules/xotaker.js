const random = require("./random");
const Live = require("./Live.js");

module.exports = class Xotaker extends Live {
    constructor(x,y){
        super(x,y)
        this.energy = 13
    }

    updateDirection(){
        return super.updateDirection()
    }

    chooseCell(ch){
        return super.chooseCell(ch)
    }

    move(){
        this.energy--

        if (this.energy >= 15) {
            this.mul()
        } 
        
        if(this.energy <= 0){
            this.die()
        }

        let arr = this.chooseCell(1)
        if(arr.length > 0)
        {
            this.eat()
        }
        else
        {
            arr = this.chooseCell(0)
            let emptyCell = random(arr)

            if (emptyCell) {
                let x = emptyCell[0]
                let y = emptyCell[1]

                matrix[y][x] = 2
                matrix[this.y][this.x] = 0

                this.x = x
                this.y = y
            }
        }

       
    }

    eat(){
        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }
    }
    
    die(){
        matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }
    }

    mul(){
        var newCell = random(this.chooseCell(0));

        if (this.energy >= 2 && newCell) {
            var newGrassEater = new Xotaker(newCell[0], newCell[1]);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }

}