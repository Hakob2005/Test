module.exports = class GameData {

    constructor() {
        this.grassCount = 0;
        this.grassEaterCount = 0;
        this.predatorCount = 0;
        this.bomberCount = 0;
        this.blackCount = 0;
    }

    addGrass() {
        this.grassCount++;
    }

    addGrassEater() {
        this.grassEaterCount++;
    }

    addPredator() {
        this.predatorCount++;
    }

    addBomber() {
        this.bomberCount++;
    }

    addBlack() {
        this.blackCount++;
    }

}