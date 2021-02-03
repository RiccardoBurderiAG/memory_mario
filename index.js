function goToLevel(lvl){
    /* possiamo gestire la renderizzazione delle card in base al livello con uno switch case */
    useSubSetCards(lvl);
    window.location.href = "./game.html";
}

function savePlayer(){
    let name = document.playerName.nome.value;
    console.log(name);
    window.localStorage.setItem("playerName", name);
}

/* function that sets the number of cards i want to show in the game page => it will render a number of "val" cards depending on localStorage */
/* for example i can create the whole 36 cards item and then slice it depending on "val" */
function useSubSetCards(val){
    console.log("hai selezionato il livello con " + val + " carte");
    window.localStorage.setItem("levelCards", val);
}
