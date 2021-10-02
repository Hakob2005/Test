const random = require("./random");
const bomb = require("./Bomber");
const black = require("./BlackThing");

module.exports = class allStarter {
    constructor (){
        this.randm;
    }

    starterr(){
        this.randm = Math.round(random(1,10));
        if (this.randm == 2){
            let y = Math.round(random(0,matrix.length-1));
            let x = Math.round(random(0,1));
            let left , up;

            if (x == 0){
                x = 0;
                left = 1;
            } else {
                x = matrix.length-1;
                left = 0;
            }

            if (y < matrix.length/2){
                up = 1;
            } else {
                up = 0;
            }

            var bomber = new bomb(x,y,up,left);
            BomberArr.push(bomber);
        } else if (this.randm == 3){
            if (BlackArr.length <= 10) {
                let x = Math.round(random(0,matrix.length-1));
                let y = Math.round(random(0,1));

                if (y == 0){
                    y = 0;
                } else {
                    y = matrix.length-1;
                }

                var blacker = new black(x,y);
                BlackArr.push(blacker);
            }
        }
    }
}