import './game.css';
import './index.css';
import cards from './data';

import { getLocalStorage, setLocalStorage } from './utils/localStorageMethods';


let match = [];     //array che conterrà le carte su cui fare il controllo di match
let moves = 0;      //integer che rappresenta il numero di volte che hai toccato una carta


window.onload = function(){
    initLevel();
    checkBestScore();
}

window.goHomeUrDrunk = function(){
    window.location.href = "./index.html"
}

//il timer inizia quando la pagina carica => deve partire dopo 5s
//però quando chiamiamo clearInterval vengono attesi questi 5s
let mytimer;
let mytimeout = setTimeout(() => {
    mytimer = setInterval(myTimer, 1000)
}, 5000);

function myTimer(){
    let timerValue = document.querySelector("table tbody tr td:nth-child(3)");
    let tmp = JSON.parse(timerValue.innerHTML);
    tmp++;
    timerValue.innerHTML = JSON.stringify(tmp);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



/* Funzione che crea il sottomazzo di cards, lo mescola, imposta il titolo del livello, renderizza le cards ( con le loro proprietà (clickedCard) ), dopo 5s nasconde le cards */
function initLevel(){
    let lvlCard = getLocalStorage("levelCards");

    //mettiamo il valore di levelCard vicino al titolo Livello
    let slicedCards = cards.slice(0,lvlCard);
    let slicedDeck = shuffleCards(slicedCards); //cosa ritorna questa funzione => ritorna slicedCards modificato ( non una copia )

    //per ogni card dentro lo slicedCards (mazzo già mescolato) creiamo l elemento e mettiamolo nella griglia del DOM
    let gridCards = document.querySelector(".cardGame");

    //prima di renderizzare tutte le card mostro il titolo del livello
    setLevelTitle(lvlCard, gridCards);

    //create and render cards
    slicedDeck.forEach((s,i)=>{
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

    //flip cards
    let cardElements = document.querySelectorAll(".cardGame");
    console.log('cardElements', cardElements[0]);
    setTimeout(() => {
        ([...cardElements[0].children]).forEach(function (element) {        //spread operator to cycle HTMLCollections
            element.classList.add("card-flipped");
        });
    }, 5000);

}

//function that shuffle the deck using Durstenfeld algorythm->ES6  (https://medium.com/@anthonyfuentes/do-the-shuffle-the-durstenfeld-shuffle-7920c2ce0c45)
function shuffleCards(array){
    let shuffledDeck = [ ...array]; //in questo modo lavoro su una copia dell array principale (immutabilità delle risorse)
    console.log("sto mescolando il mazzo", array);
    for (let i = shuffledDeck.length - 1 ;i> 0; i--){
        let j = Math.floor(Math.random()* (i+1));
    /* before ES6:
        let tmp = shuffledDeck[i];
        shuffledDeck[i] = shuffledDeck[j];
        shuffledDeck[j] = tmp;
    */
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]]
    }
    return shuffledDeck;
}



//TODO clearInterval (timer) al momento giusto => prima di far apparire congrat al posto delle card, o subito dopo aver cliccato le ultime due carte matchate
async function clickedCard(id){
    let body = document.getElementsByClassName("container");

    moves++; //ogni volta che clicchiamo una carta abbiamo fatto una mossa

    //caso in cui è stata già cliccata una carta
    if(match.length == 1){

        for (let i = 0; i < body.length; i++) {
            body.item(i).style.pointerEvents = "none";
        }

        let card = document.getElementById(id);
        card.classList.remove("card-flipped");
        console.log('card', card);
        match.push(card);
        console.log(match);

        //controlliamo se le carte matchano
        if(match[1] && match[0].innerHTML === match[1].innerHTML && match[0].id !== match[1].id){
            console.log("coppia");
            await sleep(1000);
            match.forEach(s=>{
                let x = document.getElementById(s.id);
                x.classList.add("flipped");
            })
            for (let i = 0; i < body.length; i++) {
                body.item(i).style.pointerEvents = "auto";
            }
        }else{
            //wait 3s then flip back cards
            console.log("coppia sbagliata");
            console.log(parseInt(match[0].id));
            let id0 = parseInt(match[0].id);
            let id1 = parseInt(match[1].id);
            setTimeout(() => {
                console.log(id0, id1);
                let card0 = document.getElementById(id0);
                let card1 = document.getElementById(id1);
                card0.classList.add("card-flipped");
                card1.classList.add("card-flipped");
                for (let i = 0; i < body.length; i++) {
                    body.item(i).style.pointerEvents = "auto";
                }
            }, 3000);

        }

        //reset di match
        match = []; //così avremo sempre al massimo due elementi
    }else{  //caso in cui non è stata cliccata nessuna carta
        let card = document.getElementById(id);
        card.classList.remove("card-flipped");
        console.log('card', card);
        match.push(card);
        console.log(match);
    }

    //chiamiamo la funzione che gestisce la fine della partita se non ci sono più elementi con classe card-flipped
    let matchedCards = document.querySelectorAll(".card-flipped");
    if(matchedCards.length === 0){
        clearInterval(mytimer);  //vogliamo che l intervallo sia bloccato immediatamnente
        checkStatusGame(moves);
    }
}

//function that sets the title of the level
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

//function that handles the end of the game( called inside clickedCards)
function checkStatusGame(index){
    let lvl = getLocalStorage("levelCards");
    let cards = document.querySelectorAll(".cardGame .flipped");

    if(cards.length === lvl){     //l operazione di sottrazione potrebbe essere dovuta al fatto che ignora le ultime due carte cliccate
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
        numMoves.innerHTML = index;
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
        //console.log(g);
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
