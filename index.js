
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
    /* possiamo gestire la renderizzazione delle card in base al livello con uno switch case */
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
 /*    x[indexPlayers] = {name}; */
    indexPlayers++;
    setLocalStorage("playerName",name);
    //fai in modo che salvi una lista di giocatori => ci servirà per la pagina ranklist
}

function goToRanks(lvl){
    //qui prenderemo l oggetto del localStorage corrispondente al lvl (che conterrà nome utente, numero di mosse e tempo => prendili dalla tabella alla fine del livello)
    window.localStorage.setItem("rankLevel", lvl);
    window.location.href = "./ranklist.html"
}
/* function that sets the number of cards i want to show in the game page => it will render a number of "val" cards depending on localStorage */
/* for example i can create the whole 36 cards item and then slice it depending on "val" */
function useSubSetCards(val){
    console.log("hai selezionato il livello con " + val + " carte");
    window.localStorage.setItem("levelCards", val); //in questo caso magari voglio proprio il numero come valore
}

window.onload = function(){
    /* all inizio creiamo la lista dei livelli (presi dal localstorage) che si possono fare e poi attacchiamo a tutti le icone fas fa-award il got to ranklist  */

    //console.log(getLocalStorage("playerName")[0]);
    /* creaimo le card che rimandano ai livelli */
    window.localStorage.removeItem("matchingCards");
    levels.map(l=>{
        console.log(l);
        let table = document.querySelector(".levels");
        let myCard = document.createElement("div");
        let myCardTitle = document.createElement("div");
        let myCardActions = document.createElement("div");

        myCard.classList.add(`myCard`+(l.id+1));
        //setto il titolo
        let title = document.createElement("h1");
        title.innerHTML = `Livello ` + (l.id+1) + ` (` + l.val + `)`;
        myCardTitle.appendChild(title);

        let actionList = document.createElement("ul");
        actionList.setAttribute("id", l.val);

        let listEle1 = document.createElement("li");
        let listEle2 = document.createElement("li");
        let listEle3 = document.createElement("li");

        listEle1.innerHTML = `<i class="fas fa-award" onclick="goToRanks(`+ l.val +`)"></i>`;
        listEle2.innerHTML = `<div class="completed"></div>`;
        listEle3.innerHTML = `<i class="fas fa-chevron-right" onclick="goToLevel(` + l.val + `)"></i>`;
        actionList.appendChild(listEle1);
        actionList.appendChild(listEle2);
        actionList.appendChild(listEle3);

        myCardActions.classList.add("actions");
        myCardActions.appendChild(actionList);
        myCard.appendChild(myCardTitle);
        myCard.appendChild(myCardActions);
        table.appendChild(myCard);
    })
    iconAward = document.getElementsByClassName("fa-award");
    console.log(iconAward.length);
}

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