
var levels = [
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

function goToLevel(lvl){
    //possiamo gestire la renderizzazione delle card in base al livello con uno switch case
    useSubSetCards(lvl);
    window.location.href = "./game.html";
}

let indexPlayers = 0;
let x = [];

if(!getLocalStorage("savedGames")){
    let gameStrg = [];
    setLocalStorage("savedGames", gameStrg);
}
function savePlayer(){
    let name = document.playerName.nome.value;
    console.log(typeof name);
    indexPlayers++;
    setLocalStorage("playerName",name);
    //nascondiamo il form di inserimento del nome e sostituiamolo con il nome inserito
    let formPlayer = document.querySelector("form");
    let center = document.getElementsByClassName("center");
    let playerName = document.createElement("h1");
    playerName.setAttribute("NomeGiocatore", name);
    playerName.style.margin = "0px";
    playerName.innerHTML = name;
    console.log(typeof playerName);
    center[0].appendChild(playerName);
    formPlayer.style.display = "none";
}

function startNewGame(){
    //rimette il form per l inserimento del nome e modifica il nome del giocatore nel localStorage
    let formPlayer = document.querySelector("form");
    formPlayer.style.display = "flex";
    document.getElementById("nome").value = "";
    let playerName = document.querySelector("[NomeGiocatore]");
    playerName.remove();
    window.localStorage.removeItem("playerName");
}

function goToRanks(lvl){
    window.localStorage.setItem("rankLevel", lvl);
    window.location.href = "./ranklist.html"
}
/* function that sets the number of cards i want to show in the game page => in game.html it will render a number of "val" cards depending on localStorage */
/* for example i can create the whole 36 cards item and then slice it depending on "val" */
function useSubSetCards(val){
    console.log("hai selezionato il livello con " + val + " carte");
    window.localStorage.setItem("levelCards", val); //in questo caso magari voglio proprio il numero come valore
}

/* TODO aggiungi gestione div "done" che rappresenta lo stato di superamento di un livello ( salviamo queste info nel localStorage ) => onload*/



window.onload = function(){
    // all inizio creiamo la lista dei livelli (presi dal localstorage) che si possono fare e poi attacchiamo a tutti le icone fas fa-award il got to ranklist
    let player = getLocalStorage("playerName");
    if(player && player != "-"){
        let formPlayer = document.querySelector("form");
        let center = document.getElementsByClassName("center");
        let playerName = document.createElement("h1");
        let player = getLocalStorage("playerName");
        playerName.setAttribute("NomeGiocatore", player);
        playerName.style.margin = "0px";
        playerName.innerHTML = player;
        console.log(typeof playerName);
        center[0].appendChild(playerName);
        formPlayer.style.display = "none";
    }

    // creaimo le card che rimandano ai livelli
    window.localStorage.removeItem("matchingCards");
    levels.map(l=>{
        console.log(l);
        let table = document.querySelector(".levels");
        let myCard = document.createElement("div");
        let myCardTitle = document.createElement("div");
        let myCardActions = document.createElement("div");

        myCard.classList.add(`myCard`+(l.id+1));
        let title = document.createElement("h1");
        title.innerHTML = `Livello ` + (l.id+1) + ` (` + l.val + `)`;
        myCardTitle.appendChild(title);

        let actionList = document.createElement("ul");
        actionList.setAttribute("id", l.val);

        let listEle1 = document.createElement("li");
        let listEle2 = document.createElement("li");
        let listEle3 = document.createElement("li");

        listEle1.innerHTML = `<i class="fas fa-award" onclick="goToRanks(`+ l.val +`)"></i>`;
        listEle2.innerHTML = `<div class="completed" id=`+ l.val +`></div>`;
        listEle3.innerHTML = `<i class="fas fa-chevron-right" onclick="goToLevel(` + l.val + `)"></i>`;
        actionList.appendChild(listEle1);
        actionList.appendChild(listEle2);
        actionList.appendChild(listEle3);

        myCardActions.classList.add("actions");
        myCardActions.appendChild(actionList);
        myCard.appendChild(myCardTitle);
        myCard.appendChild(myCardActions);
        table.appendChild(myCard);
        checkDone(l.val);
    })
    iconAward = document.getElementsByClassName("fa-award");
    console.log(iconAward.length);
}


function checkDone(level){
    let divDone = document.querySelector(`li[id='`+ level+`']`);
/*     divDone.style.backgroundColor = "green";
 */}

/* funzione che facilita la scrittura in localStorage => name e value devono essere stringhe */
function setLocalStorage(name, value){
    let stringifiedValue = JSON.stringify(value);
    window.localStorage.setItem(name, stringifiedValue);
}

function getLocalStorage(name){
    let strg = window.localStorage.getItem(name);
    let parsedStrg = JSON.parse(strg);
    return parsedStrg;
}