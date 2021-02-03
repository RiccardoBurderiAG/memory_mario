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
        cardId :4
    },
    {
        cardId :4
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
    },
    {
        cardId :9
    },
    {
        cardId :9
    },
    {
        cardId :10
    },
    {
        cardId :10
    },
    {
        cardId :11
    },
    {
        cardId :11
    },
    {
        cardId :12
    },
    {
        cardId :12
    },
    {
        cardId :13
    },
    {
        cardId :13
    },
    {
        cardId :14
    },
    {
        cardId :14
    },
    {
        cardId :15
    },
    {
        cardId :15
    },
    {
        cardId :16
    },
    {
        cardId :16
    },
    {
        cardId :17
    },
    {
        cardId :17
    },
    {
        cardId :18
    },
    {
        cardId :18
    }
]

window.onload = function(){
    let lclStrg = window.localStorage.getItem("levelCards");
    let levelCard = JSON.parse(lclStrg);
    /* mettiamo il valore di levelCard vicino al titolo Livello */

    console.log(levelCard);
    /* in questa funzione facciamo in modo che venga preso solo una porzione di cards e lo mescoliamo e poi creiamo i div */
    let slicedCards = cards.slice(0,levelCard);
    shuffleCards(slicedCards);
    //per ogni card dentro lo slicedCards (mazzo già mescolato) creiamo l elemento e mettiamolo nella grid => <div class="card">ciao</div>
    let gridCards = document.querySelector(".cardGame");
    slicedCards.map((s,i)=>{
        let gridElement = document.createElement("div");
        let gridInner = document.createTextNode(s.cardId);
        gridElement.appendChild(gridInner);
        gridElement.className = "card";
        gridElement.addEventListener("click", function() {
            clickedCard(i);
          });
        gridElement.id = i;
        gridCards.appendChild(gridElement);
    });

    let title = document.querySelector(".header h1");
    switch (levelCard) {
        case 12:
            title.innerHTML += " 1" + ` (`+levelCard+`)`;
            console.log("Livello 1")
            break;
        case 16:
            title.innerHTML += " 2" +` (`+levelCard+`)`;
            console.log("Livello2");
            break;
        case 20:
            title.innerHTML += " 3" +` (`+levelCard+`)`;
            console.log("Livello3");
            gridCards.style.gridTemplateColumns = "auto auto auto auto auto"
            break;
        case 24:
            title.innerHTML += " 4" +` (`+levelCard+`)`;
            console.log("Livello4");
            gridCards.style.gridTemplateColumns ="auto auto auto auto auto auto"
            break;
        case 30:
            title.innerHTML += " 5" +` (`+levelCard+`)`;
            console.log("Livello5");
            gridCards.style.gridTemplateColumns ="auto auto auto auto auto auto"
            break;
        case 36:
            title.innerHTML += " 6" +` (`+levelCard+`)`;
            console.log("Livello6");
            gridCards.style.gridTemplateColumns ="auto auto auto auto auto auto"
            break;
        default:
            break;
    }
}

function Start(){
    Timer();
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

function Timer(){
    let timerValue = document.querySelector("table tbody tr td:nth-child(3)");
    setInterval(function(){
        let tmp = JSON.parse(timerValue.innerHTML);
        tmp++;
        timerValue.innerHTML = JSON.stringify(tmp);
    }, 1000);
}

function goHomeUrDrunk(){
    window.location.href = "./index.html"
}

var match = [];

let i = 0;

/* TODO add query to get both clicked cards to hide them if matched or flip them */
function clickedCard(id){
    let card = document.getElementById(id);
    //quando clicchi una card si flippa
    card.style.backgroundColor = "red";
    //idea : potrei gestire lo stato (flipped !flipped) delle card con il localStorage ( consulta erika e raffa )
    //potrei salvare l id della card che ho cliccato in localStorage e poi per cambiarne lo stile prendo le info sul div dal localStorage
    console.log(match.length);
    if(match.length == 2){
        let card = document.getElementById(id);
        card.style.backgroundColor = "red";
        match = [];
        let clicked1 = document.getElementById(id);
        match.push(clicked1.innerHTML);
        i++;
        console.log(clicked1);
    }else{
        let card = document.getElementById(id);
        card.style.backgroundColor = "red";
        let clicked1 = document.getElementById(id);
        match.push(clicked1.innerHTML);
        console.log(match);
        i++;
        console.log(clicked1.innerHTML);
        if(!isNaN(match[1]) && match[0] === match[1]){
            console.log("coppia trovata");
            //card.style.visibility ="hidden";
            //fai in modo che le carte non siano più cliccabili -> visibility:hidden
        }else if(match.length ==1){
            //gira indietro le carte 
        }else{
            setTimeout(function(){ alert("flippo le card"); }, 3000);

        }
    }
}