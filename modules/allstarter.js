const random = require("./random");
const Bomber = require("./Bomber.js")
const BlackThing = require("./BlackThing.js")

module.exports = class allStarter {  
    constructor (){
        this.randm;
    }

    starterr(){
        this.randm = Math.round(random(1,15));
        if (this.randm == 2){
            let y = Math.round(random(0,matrix.length-1));
            let x = Math.round(random(0,matrix.length-1));


            var bomber = new Bomber(x,y);
            BomberArr.push(bomber);
        } else if (this.randm == 3 || this.randm == 4){
            if (BlackArr.length <= 20) {
                let x = Math.round(random(0,matrix.length-1));
                let y = Math.round(random(0,1));

                if (y == 0){
                    y = 0;
                } else {
                    y = matrix.length-1;
                }

                var hum = new BlackThing(x,y);
                BlackArr.push(hum); 
            }
        }
    }
}