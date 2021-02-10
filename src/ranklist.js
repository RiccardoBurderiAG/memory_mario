import './ranklist.css';
import logo from './assets/logo.png';

let lvl = getLocalStorage("rankLevel");
let playersScore = getLocalStorage("savedGames");

window.onload = function(){
    let tableBody = document.getElementsByClassName("ranklist");
    console.log(tableBody[0]);
    playersScore.map(p=>{
        if(p.level === lvl){
            let newRow = document.createElement("tr");
            let newName = document.createElement("td");
            let newTime = document.createElement("td");
            let newMoves = document.createElement("td");
            newName.innerHTML = p.playerName;
            newTime.innerHTML = p.timeGame;
            newMoves.innerHTML = p.movesGame;

            newRow.appendChild(newName);
            newRow.appendChild(newTime);
            newRow.appendChild(newMoves);
            console.log(newRow);
            tableBody[0].appendChild(newRow);
        }
    });
}

/* funzione che facilita la scrittura in localStorage => name e value devono essere stringhe */
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