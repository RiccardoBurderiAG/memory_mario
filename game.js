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
    console.log(typeof levelCard);
    /* in questa funzione facciamo in modo che venga preso solo una porzione di cards e lo mescoliamo e poi creiamo i div */
    let slicedCards = cards.slice(0,levelCard);
    shuffleCards(slicedCards);
    //per ogni card dentro lo slicedCards (mazzo già mescolato) creiamo l elemento e mettiamolo nella grid => <div class="card">ciao</div>
    let gridCards = document.querySelector(".cardGame");
    slicedCards.map(s=>{
        let gridElement = document.createElement("div");
        let gridInner = document.createTextNode("ciao");
        gridElement.appendChild(gridInner);
        gridElement.className = "card";
        gridElement.id = s.cardId;
        console.log(gridElement);
        gridCards.appendChild(gridElement);
    });
    /* let gridCards = document.getElementsByClassName(".cardGame");
    let gridElement = document.createElement("div")
    gridElement.className = "card";
    gridCards.appendChild(gridElement); */
}


function shuffleCards(array){
    console.log("sto mescolando il mazzo", array);
    //al momento non fa nulla
    var shuffledDeck = array;
    return shuffledDeck;
}