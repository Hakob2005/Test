module.exports = class seasonHandler {
    constructor(){
        this.seasonNumber = 0
    }


    // 1 = spring
    // 2 = summer
    // 3 = autumn
    // 4 = winter

    changeSeason(){
        if (this.seasonNumber == 4){
            this.seasonNumber = 1
        } else {
            this.seasonNumber++
        }
    }

    objectColor(object){
        if (object == "grass"){
            let colors = {
                Spring: "#acacac",
                Summer: "#94ffa4",
                Autumn: "#c29f6e",
                Winter: "#ffffff",
            }
            return colors
        }

    }

    mainFunction(){
        if (this.seasonNumber == 1){
            currentSeason = "Spring"
        } else if( this.seasonNumber == 2){
            currentSeason = "Summer"
        } else if( this.seasonNumber == 3){
            currentSeason = "Autumn"
        } else if( this.seasonNumber == 4){
            currentSeason = "Winter"
        }
    }
}