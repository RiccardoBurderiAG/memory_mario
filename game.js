var cards = [
    {
        cardId :0
    },
    {
        cardId :0
    },
    {
        cardId :1
    },
    {
        cardId :1
    },
    {
        cardId :2
    },
    {
        cardId :2
    },
    {
        cardId :3
    },
    {
        cardId :3
    },
    {
        cardId :4
    },
    {
        cardId :4
    },
    {
        cardId :5
    },
    {
        cardId :5
    },
    {
        cardId :6
    },
    {
        cardId :6
    },
    {
        cardId :7
    },
    {
        cardId :7
    },
    {
        cardId :8
    },
    {
        cardId :8
    },
    {
        cardId :9
    },
    {
        cardId :9
    },
    {
        cardId :10
    },
    {
        cardId :10
    },
    {
        cardId :11
    },
    {
        cardId :11
    },
    {
        cardId :12
    },
    {
        cardId :12
    },
    {
        cardId :13
    },
    {
        cardId :13
    },
    {
        cardId :14
    },
    {
        cardId :14
    },
    {
        cardId :15
    },
    {
        cardId :15
    },
    {
        cardId :16
    },
    {
        cardId :16
    },
    {
        cardId :17
    },
    {
        cardId :17
    },
    {
        cardId :18
    },
    {
        cardId :18
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
        gridElement.id = i;
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


var timer = setTimeout(() => {
    setInterval(myTimer, 1000);
}, 5000);

function myTimer(){
    let timerValue = document.querySelector("table tbody tr td:nth-child(3)");
    let tmp = JSON.parse(timerValue.innerHTML);
    tmp++;
    timerValue.innerHTML = JSON.stringify(tmp);
}

function goHomeUrDrunk(){
    window.location.href = "./index.html"
}

var match = [];
var ids = [];
let i = 0;

/* TODO aggiungi gestione click, si possono cliccare solo 2 card alla volta */
/* TODO aggiungi gestione div "done" che rappresenta lo stato di superamento di un livello ( salviamo queste info nel localStorage ) */
/* TODO stop timer when game is over */

function clickedCard(id){
    console.log(i+1); // counter of moves made
    let card = document.getElementById(id);
    //quando clicchi una card si flippa

    if(match.length == 2){
        let card = document.getElementById(id);
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
            //flippa le carte
        }else{
            setTimeout(function(){
                 if(match.length == 2 && match[0] != match[1]){
                    strgCards[1].map(s=>{
                        let x = document.getElementById(s);
                        x.classList.add("card-flipped");
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

    if(match.length == 2){
        document.getElementsByClassName(".card-flipped").pointerEvent = "none";
        checkStatusGame(i);
    }
}

//funzione che gestisce la fine del gioco
function checkStatusGame(index){
    let lvl = getLocalStorage("levelCards");
    let cards = document.querySelectorAll(".cardGame .flipped");
    if(cards.length == lvl -2){
        let cardGame = document.getElementsByClassName("cardGame");
        let congrat = document.createElement("div");
        let congratText = document.createTextNode("Congratulazioni");
        //qui devo prendere tutte le info che mi servono per popolare la tabella punteggio
        //stop timer , set number of moves, best moves number (based on localStorage)
        clearInterval(timer);
        congrat.appendChild(congratText);
        congrat.style.position = "absolute";
        congrat.style.top = "33%";
        congrat.style.left = "33%";
        congrat.style.fontSize = "40px";
        setTimeout(function(){
            cardGame[0].append(congrat);
        },1500);

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
    clearInterval(myTimer);

}

/* TODO calculate best score for player */

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