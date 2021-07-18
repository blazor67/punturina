let ape = document.querySelector("#ape");
let fungo = document.querySelector("#fungo");
let punt = document.querySelector("#punt"); //audio
let bott = document.querySelector("#assicuta"); //bott

function randomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

//variabili randompos
let apeLeft;
let apeTop;
let fungoLeft;
let fungoTop;

//ape randompos
apeLeft=randomInt(window.innerWidth)-10; 
apeTop=randomInt(window.innerHeight)-10;
ape.style.left=apeLeft+"px";
ape.style.top=apeTop+"px";

//fungo randompos
fungoLeft=randomInt(window.innerWidth)-10; 
fungoTop=randomInt(window.innerHeight)-10;
fungo.style.left=fungoLeft+"px";
fungo.style.top=fungoTop+"px";

//movimento

function assicuta(){

    //console.log("assicuta");
    //distanziamento sociale
    hDist=fungoLeft-apeLeft;
    vDist=fungoTop-apeTop;

    //calcola
    apeLeft=apeLeft+(hDist*.05)+Math.sign(hDist)*4;
    apeTop=apeTop+(vDist*.05)+Math.sign(vDist)*4;

    //assegna
    ape.style.left=apeLeft+"px";
    ape.style.top=apeTop+"px";

    
    //console.log("mi avvicino, la distanza è di "+hDist+" e "+vDist);
    return 0;
}

//check overlap di due item
function overlap(){
    if(Math.abs(fungoLeft-apeLeft)<=4 && Math.abs(fungoTop-apeTop)<=4){
        return true;
    } else{
        assicuta();
        return false;
    }
}

//dopo la punturina
function crescita(){
    punt.pause();
    punt.src="punturina.wav"
    punt.play();

    //il fungo cresce
    //random boing oppure lento
    
    rando=Math.floor(Math.random() * 2);
    if(rando>=1){ //boing
        setTimeout(function(){
            punt.src="boing.wav";
            punt.play();
            fungo.style.transition="0.2s ease-in";
            fungo.classList.add("lungo");
        },500);

    }
    else{ //lento
        
    setTimeout(function(){
        punt.src="lungo.wav";
        punt.play();
        fungo.style.transition="2s ease-in";
        fungo.classList.add("lungo");
    },500);
    }

    //ok ora puoi ricaricare
    setTimeout(function(){        
        bott.innerHTML="Ora hai il fungo lungo.<br>Clicca qui per ricaricare.";
        bott.onclick=window.location.reload.bind(window.location);
        bott.style.display="initial";
    },3000);
}

//ciclo di check se ci sei sul fungo
function ciclo(){
    setTimeout(function(){
        if(!overlap()){
            //console.log("suca");
            ciclo();
        } else {
            crescita();
        }
    },30);
}

function bottoneFungo(){

    bott.style.display="none";
    punt.play();
    ciclo();
}

bott.onclick=bottoneFungo;