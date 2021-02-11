import './ranklist.css';
import logo from './assets/logo.png';
import { getLocalStorage, setLocalStorage } from './utils/localStorageMethods';


let lvl = getLocalStorage("rankLevel");
let playersScore = getLocalStorage("savedGames");

window.onload = function(){
    let tableBody = document.getElementsByClassName("ranklist");
    let center = document.getElementsByClassName("center");
    let title = document.createElement("h1");
    switch (lvl) {
        case 12:
            title.innerHTML += `1 ${lvl}`;
            break;
        case 16:
            title.innerHTML += `2 ${lvl}`;
            break;
        case 20:
            title.innerHTML += `3 ${lvl}`;
            break;
        case 24:
            title.innerHTML += `4 ${lvl}`;
            break;
        case 30:
            title.innerHTML += `5 ${lvl}`;
            break;
        case 36:
            title.innerHTML += `6 ${lvl}`;
            break;
        default:
            break;
    }
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