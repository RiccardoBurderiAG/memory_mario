import './game.css';
import './index.css';
import end from './assets/end.jpg';
import logo from './assets/logo.png';
import card1 from './assets/1.png';
import card2 from './assets/2.png';
import card3 from './assets/3.png';
import card4 from './assets/4.png';
import card5 from './assets/5.png';
import card6 from './assets/6.png';
import card7 from './assets/7.png';
import card8 from './assets/8.png';
import card9 from './assets/9.png';
import card10 from './assets/10.png';
import card11 from './assets/11.png';
import card12 from './assets/12.png';
import card13 from './assets/13.png';
import card14 from './assets/14.png';
import card15 from './assets/15.png';
import card16 from './assets/16.png';
import card17 from './assets/17.png';
import card18 from './assets/18.png';

var cards = [
    {
        cardId :0,
        cardImage : card1
    },
    {
        cardId :0,
        cardImage : card1
    },
    {
        cardId :1,
        cardImage : card2
    },
    {
        cardId :1,
        cardImage : card2
    },
    {
        cardId :2,
        cardImage : card3
    },
    {
        cardId :2,
        cardImage : card3
    },
    {
        cardId :3,
        cardImage : card4
    },
    {
        cardId :3,
        cardImage : card4
    },
    {
        cardId :4,
        cardImage : card5
    },
    {
        cardId :4,
        cardImage : card5
    },
    {
        cardId :5,
        cardImage : card6
    },
    {
        cardId :5,
        cardImage : card6
    },
    {
        cardId :6,
        cardImage : card7
    },
    {
        cardId :6,
        cardImage : card7
    },
    {
        cardId :7,
        cardImage : card8
    },
    {
        cardId :7,
        cardImage : card8
    },
    {
        cardId :8,
        cardImage : card9
    },
    {
        cardId :8,
        cardImage : card9
    },
    {
        cardId :9,
        cardImage : card10
    },
    {
        cardId :9,
        cardImage : card10
    },
    {
        cardId :10,
        cardImage : card11
    },
    {
        cardId :10,
        cardImage : card11
    },
    {
        cardId :11,
        cardImage : card12
    },
    {
        cardId :11,
        cardImage : card12
    },
    {
        cardId :12,
        cardImage : card13
    },
    {
        cardId :12,
        cardImage : card13
    },
    {
        cardId :13,
        cardImage : card14
    },
    {
        cardId :13,
        cardImage : card14
    },
    {
        cardId :14,
        cardImage : card15
    },
    {
        cardId :14,
        cardImage : card15
    },
    {
        cardId :15,
        cardImage : card16
    },
    {
        cardId :15,
        cardImage : card16
    },
    {
        cardId :16,
        cardImage : card17
    },
    {
        cardId :16,
        cardImage : card17
    },
    {
        cardId :17,
        cardImage : card18
    },
    {
        cardId :17,
        cardImage : card18
    }
]

window.onload = function(){
    let lclStrg = window.localStorage.getItem("levelCards");
    let levelCard = JSON.parse(lclStrg);
    //mettiamo il valore di levelCard vicino al titolo Livello
    let slicedCards = cards.slice(0,levelCard);
    shuffleCards(slicedCards);
    //per ogni card dentro lo slicedCards (mazzo già mescolato) creiamo l elemento e mettiamolo nella grid => <div class="card">ciao</div>
    let gridCards = document.querySelector(".cardGame");
    slicedCards.map((s,i)=>{
        let gridElement = document.createElement("div");
        let gridInner = document.createTextNode(s.cardId);
        gridElement.appendChild(gridInner);
        gridElement.className = "card";
        gridElement.addEventListener("click", function() {
            clickedCard(i);
        });
        gridElement.style.fontSize = "1px";
        gridElement.id = i;
        gridElement.style.backgroundImage = `url(` + s.cardImage + `)`;
        gridElement.style.backgroundSize = 'contain';
        gridElement.style.backgroundRepeat = 'no-repeat';
        gridCards.appendChild(gridElement);
    });

    let cardElements = document.querySelectorAll(".cardGame");

    setTimeout(() => {
        Array.from(cardElements[0].children).forEach(function (element) {
            element.classList.add("card-flipped");
          });
        }, 5000);

    let title = document.querySelector(".header h1");
    switch (levelCard) {
        case 12:
            title.innerHTML += " 1" + ` (`+levelCard+`)`;
            break;
        case 16:
            title.innerHTML += " 2" +` (`+levelCard+`)`;
            break;
        case 20:
            title.innerHTML += " 3" +` (`+levelCard+`)`;
            gridCards.style.gridTemplateColumns = "auto auto auto auto auto"
            break;
        case 24:
            title.innerHTML += " 4" +` (`+levelCard+`)`;
            gridCards.style.gridTemplateColumns ="auto auto auto auto auto auto"
            break;
        case 30:
            title.innerHTML += " 5" +` (`+levelCard+`)`;
            gridCards.style.gridTemplateColumns ="auto auto auto auto auto auto"
            break;
        case 36:
            title.innerHTML += " 6" +` (`+levelCard+`)`;
            gridCards.style.gridTemplateColumns ="auto auto auto auto auto auto"
            break;
        default:
            break;
    }
    checkBestScore();
}


function shuffleCards(array){
    console.log("sto mescolando il mazzo", array);
    //Durstenfeld shuffle ->ES6  (https://medium.com/@anthonyfuentes/do-the-shuffle-the-durstenfeld-shuffle-7920c2ce0c45)
    for (var i = array.length - 1 ;i> 0; i--){
        var j = Math.floor(Math.random()* (i+1));
    /*
        var tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    */
        [array[i], array[j]] = [array[j], array[i]]
    }
    var shuffledDeck = array;
    return shuffledDeck;
}


//il timer inizia quando la pagina carica => deve partire dopo 5s
var mytimer = setInterval(myTimer, 1000);
function myTimer(){
    setTimeout(() => {
    let timerValue = document.querySelector("table tbody tr td:nth-child(3)");
    let tmp = JSON.parse(timerValue.innerHTML);
    tmp++;
    timerValue.innerHTML = JSON.stringify(tmp);
}, 5000);

}


window.goHomeUrDrunk = function(){
    window.location.href = "./index.html"
}


var match = [];
var ids = [];
let i = 0;

/* TODO imposta al momento giusto il clearInterval(timer) per il calcolo del tempo impiegato */
/* TODO animazione del flip mostra prima la carta "non flippata" e poi la flippa  */

function clickedCard(id){
    let card = document.getElementById(id);

    if(match.length == 2){
        //flippa la card
        card.classList.remove("card-flipped");
        match = [];
        let clicked1 = document.getElementById(id);
        match.push(clicked1.innerHTML);
        i++;
    }else{
        let card = document.getElementById(id);
        //flippa la card
        card.classList.remove("card-flipped");
        let clicked1 = document.getElementById(id);
        match.push(clicked1.innerHTML);
        i++;
        if(!isNaN(match[1]) && match[0] === match[1]){
            console.log("coppia trovata");
        }else if(match.length == 1){
            //se tolgo questo if il gioco si blocca perchè esegue riga 302
        }else{
            var body = document.getElementsByClassName("container");

            for (i = 0; i < body.length; i++) {
            body.item(i).style.pointerEvents = "none";
            }
            setTimeout(function(){
                 if(match.length == 2 && match[0] != match[1]){
                    strgCards[1].map(s=>{
                        document.getElementsByClassName("card-flipped").pointerEvent = "none";
                        console.log(document.getElementsByClassName("card-flipped"));
                        let x = document.getElementById(s);
                        x.classList.add("card-flipped");
                        for (i = 0; i < body.length; i++) {
                            body.item(i).style.pointerEvents = "auto";
                        }
                    })
                }
            }, 3000);

        }
    }
    if(ids.length == 2 ){
        ids = [];
    }
    ids.push(id);
    setLocalStorage("matchingCards",[match,ids]);
    //dopo aver settato nel local storage il riferimento all elemento tramite id possiamo prendere tutti gli elementi con quell id e aggiungere classi in modo dinamico
    let strgCards = getLocalStorage("matchingCards");
    setTimeout(function(){
        if(match[0] === match[1] && ids[0] !== ids[1]){
            //prendiamo gli elementi che hanno id = id salvati in ids(localstorage)
            //in strgCards[1] stanno gli indici delle carte che ho matchato
            strgCards[1].map(s=>{
                let x = document.getElementById(s);
                x.classList.add("flipped");
            })
        }
    }, 1000);

    console.log(document.getElementById("container"));
    //document.getElementById("container")[0].children.style.pointerEvents = "none";
    if(match.length == 2){
        let lvl = getLocalStorage("levelCards");
        let cards = document.querySelectorAll(".cardGame .flipped");
        if(cards.length == lvl -2){
            clearInterval(mytimer);
            checkStatusGame(i);
        }
    }
}


//funzione che gestisce la fine del gioco
function checkStatusGame(index){
    let lvl = getLocalStorage("levelCards");
    let cards = document.querySelectorAll(".cardGame .flipped");
    if(cards.length == lvl -2){
        clearInterval(mytimer);
        let cardGame = document.getElementsByClassName("cardGame");
        let congrat = document.createElement("div");
        //trasformiamo congratText in un immagine
        //let congratText = document.createTextNode("Congratulazioni");
        let congratImage = document.createElement("img");
        congratImage.src = "./assets/end.jpg";
        congratImage.classList.add("imageEnd");
        //stop timer , set number of moves, best moves number (based on localStorage)
        congrat.appendChild(congratImage);
        congrat.classList.add("end");
        setTimeout(function(){
            cardGame[0].append(congrat);
        },2000);

        let numMoves = document.querySelector("table tbody tr td:nth-child(2)");
        numMoves.innerHTML = index+1;

        //qui salviamo queste info nel localStorage come score del giocatore
        saveGame();
        checkBestScore();
    }
    //complimenti hai finito la partita
}



function saveGame(){
    let playerName = getLocalStorage("playerName"); //stringa
    let timeGame = document.querySelector("tbody tr td:nth-child(3)");    //prendiamo il valore che è stato impostato nella tabella
    let movesGame = document.querySelector("tbody tr td:nth-child(2)");
    let lvl = getLocalStorage("levelCards");
    if(playerName == null){
        var newGame = {
            "playerName" : "-",
            "timeGame" : timeGame.innerHTML,
            "movesGame" : movesGame.innerHTML,
            "level" : lvl
        };
    }else{
        var newGame = {
            "playerName" : playerName,
            "timeGame" : timeGame.innerHTML,
            "movesGame" : movesGame.innerHTML,
            "level" : lvl
        };
    }
    let gameStrg = getLocalStorage("savedGames");
    gameStrg.push(newGame);
    console.log(gameStrg);
    window.localStorage.removeItem("matchingCards");
    setLocalStorage("savedGames", gameStrg);
}


function checkBestScore(){
    //per ogni elemento nel localStorage con chiave
    window.localStorage.removeItem("bestScore");
    let games = getLocalStorage("savedGames");
    let playerName = getLocalStorage("playerName");
    let level = getLocalStorage("levelCards");
    let scores = [];
    //preso il valore di playerName, per ogni elemento in savedGames con name = playerName calcoliamo il maxScore di quel giocatore
    games.map(g =>{
        console.log(g);
        if(g.playerName == playerName && g.level == level){
            scores.push(g.movesGame);
            var min = Math.min( ...scores);
            console.log(min);
            setLocalStorage("bestScore", min);
        }
    })

    let bestScore = getLocalStorage("bestScore");
    let tabEleScore = document.querySelector("table tbody tr td:first-child");
    tabEleScore.innerHTML = bestScore;
}

// funzione che facilita la scrittura in localStorage => name e value devono essere stringhe
function setLocalStorage(name, value){
    let stringifiedValue = JSON.stringify(value);
    window.localStorage.setItem(name, stringifiedValue);
}

function getLocalStorage(name){
    let strg = window.localStorage.getItem(name);
    let parsedStrg = JSON.parse(strg);
    console.log(parsedStrg);
    return parsedStrg;
}