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
    }
]

window.onload = function(){
    let lclStrg = window.localStorage.getItem("levelCards");
    let levelCard = JSON.parse(lclStrg);
    /* mettiamo il valore di levelCard vicino al titolo Livello */

    console.log(typeof levelCard);
    /* in questa funzione facciamo in modo che venga preso solo una porzione di cards e lo mescoliamo e poi creiamo i div */
    let slicedCards = cards.slice(0,levelCard);
    shuffleCards(slicedCards);
    //per ogni card dentro lo slicedCards (mazzo già mescolato) creiamo l elemento e mettiamolo nella grid => <div class="card">ciao</div>
    let gridCards = document.querySelector(".cardGame");
    slicedCards.map(s=>{
        let gridElement = document.createElement("div");
        let gridInner = document.createTextNode(s.cardId);
        gridElement.appendChild(gridInner);
        gridElement.className = "card";
        gridElement.id = s.cardId;
        gridCards.appendChild(gridElement);
    });
}


/* TODO shuffle array */
function shuffleCards(array){
    console.log("sto mescolando il mazzo", array);
    //Durstenfeld shuffle ->ES6  (https://medium.com/@anthonyfuentes/do-the-shuffle-the-durstenfeld-shuffle-7920c2ce0c45)
    for (var i = array.length - 1 ;i> 0; i--){
        var j = Math.floor(Math.random()* (i+1));
/*         var tmp = array[i];
        array[i] = array[j];
        array[j] = tmp; */
        [array[i], array[j]] = [array[j], array[i]]
    }
    var shuffledDeck = array;
    return shuffledDeck;
}