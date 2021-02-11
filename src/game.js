import './game.css';
import './index.css';
import cards from './data';
import { getLocalStorage, setLocalStorage } from './utils/localStorageMethods';

window.onload = function(){
    initLevel();
    checkBestScore();
}


//il timer inizia quando la pagina carica => deve partire dopo 5s
let mytimer = setInterval(myTimer, 1000);
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


let match = [];
let ids = [];
let i = 0;

/* TODO imposta al momento giusto il clearInterval(timer) per il calcolo del tempo impiegato */
/* TODO animazione del flip mostra prima la carta "non flippata" e poi la flippa  */


/* Funzione che crea il sottomazzo di cards, lo mescola, imposta il titolo del livello, renderizza le cards ( con le loro proprietà (clickedCard) ), dopo 5s nasconde le cards */
function initLevel(){
    let lvlCard = getLocalStorage("levelCards");

    //mettiamo il valore di levelCard vicino al titolo Livello
    let slicedCards = cards.slice(0,lvlCard);
    shuffleCards(slicedCards); //cosa ritorna questa funzione => ritorna slicedCards modificato ( non una copia )

    //per ogni card dentro lo slicedCards (mazzo già mescolato) creiamo l elemento e mettiamolo nella griglia del DOM
    let gridCards = document.querySelector(".cardGame");

    //prima di renderizzare tutte le card mostro il titolo del livello
    setLevelTitle(lvlCard, gridCards);

    //render cards
    slicedCards.forEach((s,i)=>{
        let gridElement = document.createElement("div");
        let gridInner = document.createTextNode(s.cardId);
        gridElement.appendChild(gridInner);
        gridElement.className = "card";
        gridElement.addEventListener("click", function() {
            clickedCard(i);
        });
        gridElement.style.fontSize = "1px";
        gridElement.id = i;
        gridElement.style.backgroundImage = `url( ${s.cardImage})`;
        gridElement.style.backgroundSize = 'contain';
        gridElement.style.backgroundRepeat = 'no-repeat';
        gridCards.appendChild(gridElement);
    });

    //hide cards
    let cardElements = document.querySelectorAll(".cardGame");
    console.log('cardElements', cardElements[0]);
    setTimeout(() => {
        ([...cardElements[0].children]).forEach(function (element) {        //spread operator to cycle HTMLCollections
            element.classList.add("card-flipped");
        });
    }, 5000);

}

function shuffleCards(array){
    console.log("sto mescolando il mazzo", array);
    //Durstenfeld shuffle ->ES6  (https://medium.com/@anthonyfuentes/do-the-shuffle-the-durstenfeld-shuffle-7920c2ce0c45)
    for (let i = array.length - 1 ;i> 0; i--){
        let j = Math.floor(Math.random()* (i+1));
    /*
        let tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    */
        [array[i], array[j]] = [array[j], array[i]]
    }
    let shuffledDeck = array;
    return shuffledDeck;
}

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
            let body = document.getElementsByClassName("container");

            for (i = 0; i < body.length; i++) {
            body.item(i).style.pointerEvents = "none";
            }
            setTimeout(function(){
                 if(match.length == 2 && match[0] != match[1]){
                    strgCards[1].forEach(s=>{
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
            strgCards[1].forEach(s=>{
                let x = document.getElementById(s);
                x.classList.add("flipped");
            })
        }
    }, 1000);

    console.log(document.getElementById("container"));
    //document.getElementById("container")[0].children.style.pointerEvents = "none";
    if(match.length == 2){
        checkStatusGame(i);
        let lvl = getLocalStorage("levelCards");
        let cards = document.querySelectorAll(".cardGame .flipped");
        if(cards.length == lvl -2){
            clearInterval(mytimer);
        }
    }
}

function setLevelTitle(lvlCard, gridCards){
    let title = document.querySelector(".header h1");
    switch (lvlCard) {
        case 12:
            title.innerHTML += `1 (${lvlCard})`;
            break;
        case 16:
            title.innerHTML += `2 (${lvlCard})`;
            break;
        case 20:
            title.innerHTML += `3 (${lvlCard})`;
            gridCards.style.gridTemplateColumns = "auto auto auto auto auto"
            break;
        case 24:
            title.innerHTML += `4 (${lvlCard})`;
            gridCards.style.gridTemplateColumns ="auto auto auto auto auto auto"
            break;
        case 30:
            title.innerHTML += `5 (${lvlCard})`;
            gridCards.style.gridTemplateColumns ="auto auto auto auto auto auto"
            break;
        case 36:
            title.innerHTML += `6 (${lvlCard})`;
            gridCards.style.gridTemplateColumns ="auto auto auto auto auto auto"
            break;
        default:
            break;
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
    let newGame = {};
    if(playerName == null){
        newGame = {
            "playerName" : "-",
            "timeGame" : timeGame.innerHTML,
            "movesGame" : movesGame.innerHTML,
            "level" : lvl
        };
    }else{
        newGame = {
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
    games.forEach(g =>{
        console.log(g);
        if(g.playerName == playerName && g.level == level){
            scores.push(g.movesGame);
            let min = Math.min( ...scores);
            console.log(min);
            setLocalStorage("bestScore", min);
        }
    })

    let bestScore = getLocalStorage("bestScore");
    let tabEleScore = document.querySelector("table tbody tr td:first-child");
    tabEleScore.innerHTML = bestScore;
}
