// kortstokk deles opp i 4 array for hver av kortelementene hjerter, kløver, spar og ruter

const kortStokk = {
    hjerter: [1,2,3,4,5,6,7,8,9,10,11,12,13],
    klover: [1,2,3,4,5,6,7,8,9,10,11,12,13],
    spar: [1,2,3,4,5,6,7,8,9,10,11,12,13],
    ruter: [1,2,3,4,5,6,7,8,9,10,11,12,13],
}


// spillere blir delt opp i to objekter hvor mulighet for sporing av spill 
let spillerEn = {
    bunke: "",
    antallKort : 0,
    antallPoeng: 0
}

let spillerTo = {
    bunke: "",
    antallKort : 0,
    antallPoeng: 0
}

let spill = {
    premieBunke: "",
    aktivKort: 0,
    premieKort: "",
    runde: 0,
}

// alternativ 2 for kortstokk er å lagre de som strings i en array med kortelement bak tallet.
// denne gir mulighet for fair blanding
const kortStokk2 = ["1h","2h","3h","4h","5h","6h","7h","8h","9h","10h","11h","12h","13h",
                    "1k","2k","3k","4k","5k","6k","7k","8k","9k","10k","11k","12k","13k",
                    "1s","2s","3s","4s","5s","6s","7s","8s","9s","10s","11s","12s","13s",
                    "1r","2r","3r","4r","5r","6r","7r","8r","9r","10r","11r","12r","13r"]

var blandetKortstokk = blandKort(kortStokk2);

var klarKortstokk = suits(blandetKortstokk);
var restartKortstokk = kortStokk2;


// funskjonen deler opp blandet kortstokk inn i 4 array for 4 kortstokktyper, hjerter, kløver, spar, ruter
function suits(array) {
    var hjerte = []
    var klover = []
    var spar = []
    var ruter = []

    for (let index = 0; index < array.length; index++) {
        if(array[index].length <= 2){
            type = array[index].substring(1);
        } else {
            type = array[index].substring(2);
        } 

        
        switch (type) {
            case "h":
                hjerte.push(array[index]);
                break;

            case "k":
                klover.push(array[index]);
                break;

            case "s":        
                spar.push(array[index])
                break;

            case "r":
                ruter.push(array[index]);
                break;
        
            default:
                break;
        }
    type = "";
    }
    return {hjerte: hjerte, klover: klover, spar: spar, ruter: ruter}
}

// Funskjon blandkort stokker antall kort 52 runder for array.
// Bruker JS math funskjonen for å determinere et tilfeldig tall
// siste kort blir erstattet med tilfeldig valgt kort fra array til det kommer til første kort
// funksjonen er inspirert av stackoverflow.
function blandKort(array) {
    let samtidIndex = array.length,  tilfeldigIndex;
         while (samtidIndex != 0) {
            tilfeldigIndex = Math.floor(Math.random() * samtidIndex);
            samtidIndex--;
            [array[samtidIndex], array[tilfeldigIndex]] = [ array[tilfeldigIndex], array[samtidIndex]];
         }
     return array;
}

function startSpill(){
    // var tilfeldigBunke = ["h","k","s","r"]
    var tilfeldigBunke = ["hjerte","klover","spar","ruter"]
    const tilfeldigTall = randomIntFromInterval(0, 3)
    var premieBunke = tilfeldigBunke[tilfeldigTall]

    console.log("premiebunke ble valgt som: " + premieBunke.toString())
    tilfeldigBunke.splice(tilfeldigTall, 1)
    console.log(tilfeldigBunke)
    spill.premieBunke = premieBunke;

    switch (premieBunke) {
        case "hjerte":
           document.getElementById("gameMasterKort").innerHTML =  klarKortstokk.hjerte[0] ;
           spill.premieKort = klarKortstokk.hjerte[0] 
           klarKortstokk.hjerte.splice(0, 1)
            break;
        case "klover":
            document.getElementById("gameMasterKort").innerHTML = klarKortstokk.klover[0] ;
            spill.premieKort = klarKortstokk.klover[0] 
            klarKortstokk.klover.splice(0, 1)
            break;
        case "spar":
            document.getElementById("gameMasterKort").innerHTML =  klarKortstokk.spar[0] ;
            spill.premieKort = klarKortstokk.spar[0] 
            klarKortstokk.spar.splice(0, 1)
            break;

        case "ruter":
            document.getElementById("gameMasterKort").innerHTML = klarKortstokk.ruter[0] ;
            spill.premieKort = klarKortstokk.ruter[0] 
            klarKortstokk.ruter.splice(0, 1)
            break;

        default:
            break;
    }
    document.getElementById("gameMaster").innerHTML =  document.getElementById("gameMaster").innerHTML + " " +  spill.premieBunke
    spill.runde = 1;

    const tilfeldigTallTo = randomIntFromInterval(0, 2)
    var spillerEnBunke = tilfeldigBunke[tilfeldigTallTo]
    console.log("Spiller 1 starter med: " + spillerEnBunke.toString())
    tilfeldigBunke.splice(tilfeldigTallTo, 1)
    console.log(tilfeldigBunke)
    spillerEn.bunke = spillerEnBunke;
    document.getElementById("spillerEn").innerHTML = document.getElementById("spillerEn").innerHTML + spillerEnBunke

    const tilfeldigTallTre = randomIntFromInterval(0, 1)
    var spillerToBunke = tilfeldigBunke[tilfeldigTallTre]
    console.log("Spiller 2 starter med: " + spillerToBunke.toString())
    spillerTo.bunke = spillerToBunke;
    document.getElementById("spillerTo").innerHTML = document.getElementById("spillerTo").innerHTML + spillerToBunke

    tilfeldigBunke.splice(tilfeldigTallTre, 1)
    console.log(tilfeldigBunke)
    console.log("Eliminert bunke: " + tilfeldigBunke[0].toString())
    document.getElementById("eliminertBunke").innerHTML = document.getElementById("eliminertBunke").innerHTML + tilfeldigBunke[0].toString()
    document.getElementById("runde").innerHTML = spill.runde.toString();
    // spill.runde = spill.runde + 1;

    document.getElementById("startSpill").classList.toggle('hideAll')
    document.getElementById("game").classList.remove('hideAll')
    // var premieBunke = 
}



function spillRunde(){

    var premieKortTall =  spill.premieKort.substring(0, spill.premieKort.length - 1)
    console.log(premieKortTall)

    document.getElementById("spillerEnKort").innerHTML = premieKortTall + spillerEn.bunke.substring(0, 1);


    switch (spillerTo.bunke) {
        case "hjerte":
            var tilfeldigHjerte = randomIntFromInterval(0, klarKortstokk.hjerte.length - 1)
            document.getElementById("spillerToKort").innerHTML = klarKortstokk.hjerte[tilfeldigHjerte];
            klarKortstokk.hjerte.splice(tilfeldigHjerte, 1)
           break;
        case "klover":
            var tilfeldigKlover = randomIntFromInterval(0, klarKortstokk.klover.length - 1)
            document.getElementById("spillerToKort").innerHTML = klarKortstokk.klover[tilfeldigKlover];
            klarKortstokk.klover.splice(tilfeldigKlover, 1)
            break;
        case "spar":
            var tilfeldigSpar = randomIntFromInterval(0, klarKortstokk.spar.length - 1)
            document.getElementById("spillerToKort").innerHTML = klarKortstokk.spar[tilfeldigSpar];
            klarKortstokk.spar.splice(tilfeldigSpar, 1)
            break;
    
        case "ruter":
            var tilfeldigRuter = randomIntFromInterval(0, klarKortstokk.ruter.length - 1)
            document.getElementById("spillerToKort").innerHTML = klarKortstokk.ruter[tilfeldigRuter];
            klarKortstokk.ruter.splice(tilfeldigRuter, 1)
            break;
    
            default:
                break;
    }

    // spill.runde = spill.runde + 1;
    var poengTo= document.getElementById("spillerToKort").innerHTML.length
    if(spill.premieKort.length <= 2 && poengTo <= 2){
        var poeng = spill.premieKort.substring(0, 1);
        var poengSpillerTo = document.getElementById("spillerToKort").innerHTML.substring(0, 1)
        rundeAvgjor(poeng, poengSpillerTo)
        // if (parseInt(poeng) < parseInt(poengSpillerTo)) {
        //     spillerTo.antallPoeng = spillerTo.antallPoeng + parseInt(poeng)
        //     document.getElementById("spillerToPoeng").innerHTML = spillerTo.antallPoeng.toString();
        //     document.getElementById("spillerEnPoeng").innerHTML = spillerEn.antallPoeng.toString();

        // } else if (parseInt(poeng) > parseInt(poengSpillerTo)) {
        //     spillerEn.antallPoeng = spillerEn.antallPoeng + parseInt(poeng)
        //     document.getElementById("spillerEnPoeng").innerHTML = spillerEn.antallPoeng.toString();
        //     document.getElementById("spillerToPoeng").innerHTML = spillerTo.antallPoeng.toString();
        // } else if (parseInt(poeng) === parseInt(poengSpillerTo)){

        // }
        
    } else if (spill.premieKort.length > 2 && poengTo <= 2){
        var poeng = spill.premieKort.substring(0, 2)
        var poengSpillerTo = document.getElementById("spillerToKort").innerHTML.substring(0, 1)
        rundeAvgjor(poeng, poengSpillerTo)
    } else if (spill.premieKort.length > 2 && poengTo > 2){
        var poeng = spill.premieKort.substring(0, 2)
        var poengSpillerTo = document.getElementById("spillerToKort").innerHTML.substring(0, 2)
        rundeAvgjor(poeng, poengSpillerTo)
    } 
    else if (spill.premieKort.length <= 2 && poengTo > 2){
        var poeng = spill.premieKort.substring(0, 1)
        var poengSpillerTo = document.getElementById("spillerToKort").innerHTML.substring(0, 2)
        rundeAvgjor(poeng, poengSpillerTo)
    } 
    document.getElementById("spillRunde").classList.toggle('hideAll')
    document.getElementById("nesteRunde").classList.remove('hideAll')
    // spiller en satsning
    


}

function rundeAvgjor(poeng, poengSpillerTo){
    if (parseInt(poeng) < parseInt(poengSpillerTo)) {
        spillerTo.antallPoeng = spillerTo.antallPoeng + parseInt(poeng)
        document.getElementById("spillerToPoeng").innerHTML = spillerTo.antallPoeng.toString();
        document.getElementById("spillerEnPoeng").innerHTML = spillerEn.antallPoeng.toString();
        document.getElementById("vunnetTo").innerHTML = " Vant Runde";

    } else if (parseInt(poeng) > parseInt(poengSpillerTo)) {
        spillerEn.antallPoeng = spillerEn.antallPoeng + parseInt(poeng)
        document.getElementById("spillerEnPoeng").innerHTML = spillerEn.antallPoeng.toString();
        document.getElementById("spillerToPoeng").innerHTML = spillerTo.antallPoeng.toString();
        document.getElementById("vunnetEn").innerHTML = " Vant Runde";
    } else if (parseInt(poeng) === parseInt(poengSpillerTo)){
        document.getElementById("spillerEnPoeng").innerHTML = spillerEn.antallPoeng.toString();
        document.getElementById("spillerToPoeng").innerHTML = spillerTo.antallPoeng.toString();
        document.getElementById("vunnetEn").innerHTML = " Uavgjort";
        document.getElementById("vunnetTo").innerHTML = " Uavgjort";
    }
}

function nesteRunde(){

    document.getElementById("spillerToKort").innerHTML = "";
    document.getElementById("spillerEnKort").innerHTML = "";
    // document.getElementById("spillerEnPoeng").innerHTML = "";
    // document.getElementById("spillerToPoeng").innerHTML = "";
    document.getElementById("vunnetEn").innerHTML = "";
    document.getElementById("vunnetTo").innerHTML = "";
    

    switch (spill.premieBunke) {
        case "hjerte":
           document.getElementById("gameMasterKort").innerHTML =  klarKortstokk.hjerte[0] ;
           spill.premieKort = klarKortstokk.hjerte[0] 
           klarKortstokk.hjerte.splice(0, 1)
            break;
        case "klover":
            document.getElementById("gameMasterKort").innerHTML = klarKortstokk.klover[0] ;
            spill.premieKort = klarKortstokk.klover[0] 
            klarKortstokk.klover.splice(0, 1)
            break;
        case "spar":
            document.getElementById("gameMasterKort").innerHTML =  klarKortstokk.spar[0] ;
            spill.premieKort = klarKortstokk.spar[0] 
            klarKortstokk.spar.splice(0, 1)
            break;

        case "ruter":
            document.getElementById("gameMasterKort").innerHTML = klarKortstokk.ruter[0] ;
            spill.premieKort = klarKortstokk.ruter[0] 
            klarKortstokk.ruter.splice(0, 1)
            break;

        default:
            break;
    }

    spill.runde = spill.runde + 1;
    document.getElementById("runde").innerHTML = spill.runde.toString();
    document.getElementById("spillRunde").classList.remove('hideAll')
    document.getElementById("nesteRunde").classList.toggle('hideAll')
    if(spill.runde === 14) {
        document.getElementById("restartSpill").classList.remove('hideAll')
        document.getElementById("spillRunde").classList.toggle('hideAll')
        if(spillerEn.antallPoeng < spillerTo.antallPoeng) {
            alert("Hurra Spiller 2 vant!!!")
        }
        else if(spillerEn.antallPoeng > spillerTo.antallPoeng) {
            alert("Hurra Spiller 1 vant!!!")
        }
        else if(spillerEn.antallPoeng === spillerTo.antallPoeng) {
            alert("Det ble faktisk Uavgjort!!!")
        }
       
    }
}

function restartSpill(){
    document.getElementById("spillRunde").classList.toggle('hideAll')
    document.getElementById("restartSpill").classList.toggle('hideAll')
    document.getElementById("startSpill").classList.toggle('hideAll')
    spillerEn.antallPoeng = 0
    spillerTo.antallPoeng = 0
    document.getElementById("gameMaster").innerHTML = "Premiebunke:"
    document.getElementById("spillerEn").innerHTML = "Spiller 1: "
    document.getElementById("spillerTo").innerHTML = "Spiller 2: "
    document.getElementById("eliminertBunke").innerHTML = "Eliminert bunke: "
    document.getElementById("spillerToPoeng").innerHTML = "";
    document.getElementById("spillerEnPoeng").innerHTML = "";

    blandetKortstokk = blandKort(kortStokk2);
    klarKortstokk = suits(blandetKortstokk);


    startSpill();
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
//   }

console.log(blandetKortstokk)