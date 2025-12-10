import './index.css';
import { getLocalStorage, setLocalStorage } from './utils/localStorageMethods';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

let levels = [
    {
        id: 0,
        val: 12
    },
    {
        id:1,
        val:16
    },
    {
        id:2,
        val:20
    },
    {
        id:3,
        val: 24
    },
    {
        id:4,
        val: 30
    },
    {
        id:5,
        val: 36
    }
]

window.onload = function(){
    // all inizio creiamo la lista dei livelli (presi dal localstorage) che si possono fare e poi attacchiamo a tutti le icone fas fa-award il got to ranklist
    checkPlayer();

    // creaimo le card che rimandano ai livelli
    window.localStorage.removeItem("matchingCards");

    createLevelsList();

    setPlayerNameStyle();

}


if(!getLocalStorage("savedGames")){
    let gameStrg = [];
    setLocalStorage("savedGames", gameStrg);
}


//mettiamo export così quando webpack fa il bundle queste funzioni avranno uno scope molto elevato( livello window ) e potrenno essere chiamate in qualunque momento
//questo succede solo per le funzioni che non vengono chiamate direttamente all interno del codice stesso (savePlayer e startNewGame sono due funzioni eseguite in seguito ad un evento click)
window.savePlayer = function(){
    let name = document.playerName.nome.value;
    console.log(typeof name);
    setLocalStorage("playerName",name);
    //nascondiamo il form di inserimento del nome e sostituiamolo con il nome inserito
    let formPlayer = document.querySelector("form");
    let center = document.getElementsByClassName("center");
    let playerName = document.createElement("h1");
    playerName.setAttribute("NomeGiocatore", name);
    playerName.style.margin = "auto";
    playerName.style.order = "1";
    let restartButton = document.querySelector("#restart");
    restartButton.style.order = "2";
    playerName.innerHTML = name;
    console.log(typeof playerName);
    center[0].appendChild(playerName);
    formPlayer.style.display = "none";
    location.reload();  // ne abbiamo bisogno perchè altrimenti non carica i divDone relativi al giocatore => con react farei un refresh del componente
}


window.startNewGame = function(){
    //rimette il form per l inserimento del nome e modifica il nome del giocatore nel localStorage
    let formPlayer = document.querySelector("form");
    formPlayer.style.display = "flex";
    document.getElementById("nome").value = "";
    let playerName = document.querySelector("[NomeGiocatore]");
    playerName.remove();
    let restartButton = document.querySelector("#restart");
    restartButton.style.display = "none";   
    window.localStorage.removeItem("playerName");
    //location.reload();
}

function checkPlayer(){
    let player = getLocalStorage("playerName");
    if(player && player != "-"){
        let restartButton = document.getElementById("restart");
        restartButton.style.display = "inline";
        let formPlayer = document.querySelector("form");
        let center = document.getElementsByClassName("center");
        let playerName = document.createElement("h1");
        let player = getLocalStorage("playerName");
        playerName.setAttribute("NomeGiocatore", player);
        playerName.style.margin = "0px";
        playerName.style.color = "white";
        playerName.innerHTML = player;
        console.log(typeof playerName);
        center[0].appendChild(playerName);
        formPlayer.style.display = "none";
    }
}

function createLevelsList(){
    levels.forEach(l=>{
        console.log(l);
        let table = document.querySelector(".levels");
        let myCard = document.createElement("div");
        let myCardTitle = document.createElement("div");
        let myCardActions = document.createElement("div");

        myCard.classList.add(`myCard${l.id+1}`);
        let title = document.createElement("h1");
        title.innerHTML = `Livello ${l.id+1} (${l.val})`;
        myCardTitle.appendChild(title);

        let actionList = document.createElement("ul");
        actionList.setAttribute("id", l.val);

        let listEle1 = document.createElement("li");
        let listEle2 = document.createElement("li");
        let listEle3 = document.createElement("li");

        listEle1.innerHTML = '<i class="fas fa-award"></i>';
        listEle2.innerHTML = `<div class="completed" id= ${l.val}></div>`;
        listEle3.innerHTML = '<i class="fas fa-chevron-right"></i>';
        actionList.appendChild(listEle1);
        actionList.appendChild(listEle2);
        actionList.appendChild(listEle3);

        listEle1.onclick = function(){
            window.localStorage.setItem("rankLevel", l.val);
            window.location.href = "./ranklist.html"
        }
        listEle3.onclick = function(){
            useSubSetCards(l.val);
            window.location.href = "./game.html";
        }
        myCardActions.classList.add("actions");
        myCardActions.appendChild(actionList);
        myCard.appendChild(myCardTitle);
        myCard.appendChild(myCardActions);
        table.appendChild(myCard);
        checkDone(l.val);
    })

}

function setPlayerNameStyle(){
    let playerName = document.querySelector("[NomeGiocatore]");
    if(playerName != null){
        playerName.style.margin = "auto";
        playerName.style.order = "1";
    }
    let restartButton = document.querySelector("#restart");
    restartButton.style.order = "2";
};
/* function that sets the number of cards i want to show in the game page => in game.html it will render a number of "val" cards depending on localStorage */
/* for example i can create the whole 36 cards item and then slice it depending on "val" */
function useSubSetCards(val){
    console.log("hai selezionato il livello con " + val + " carte");
    setLocalStorage("levelCards", val); //in questo caso magari voglio proprio il numero come valore
}

function checkDone(level){
    //controlla se esiste almeno un elemento di savedGames con campo level = level
    let player = getLocalStorage("playerName");
    let lvl = getLocalStorage("savedGames");
    lvl.forEach(l => {
        if(l.level == level && player == l.playerName){
            let divDone = document.querySelector(`.completed[id="${level}"]`);
            divDone.style.backgroundImage = "url('https://static4.depositphotos.com/1011028/340/v/600/depositphotos_3406557-stock-illustration-thumb-up-gesture.jpg')";
            divDone.style.backgroundSize = "contain";
            divDone.style.backgroundRepeat = "no-repeat";
            divDone.style.backgroundColor = "rgba(51,51,51, 0.1)"
        }
    })
}