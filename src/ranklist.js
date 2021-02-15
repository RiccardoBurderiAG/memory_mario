import './ranklist.css';
import './index.css';

import { getLocalStorage, setLocalStorage } from './utils/localStorageMethods';


let lvl = getLocalStorage("rankLevel");
let playersScore = getLocalStorage("savedGames");

window.onload = function(){
    createRankTable()
}

function createRankTable(){
    let tableBody = document.getElementsByClassName("ranklist");
    let table = document.getElementById("ranklist");
    let center = document.getElementsByClassName("center");
    let title = document.createElement("h1");
    switch (lvl) {
        case 12:
            title.innerHTML += `Level 1 (${lvl})`;
            break;
        case 16:
            title.innerHTML += `Level 2 (${lvl})`;
            break;
        case 20:
            title.innerHTML += `Level 3 (${lvl})`;
            break;
        case 24:
            title.innerHTML += `Level 4 (${lvl})`;
            break;
        case 30:
            title.innerHTML += `Level 5 (${lvl})`;
            break;
        case 36:
            title.innerHTML += `Level 6 (${lvl})`;
            break;
        default:
            break;
    }
    center[0].appendChild(title);
    title.style.order = "1";
    table.style.order = "2";

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