const letters = "abcdefghijklmnopqrstuvwxyz";

document.querySelectorAll('.hypetext').forEach(function(hypetext) {
    
    hypetext.onmouseover = event => {
        let iteration = 0; 
        const intervel = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
                .map((letter,index) => {
                    if(index < iteration)   
                    return event.target.dataset.value[index];   
                    return letters[Math.floor(Math.random() * 26)];
                }).join("");
            
            if(iteration >= event.target.dataset.value.length) clearInterval(intervel);
            iteration += 1 / 3;
        },30); 
    };
    
});

let cont = document.getElementsByClassName("container")[0];
document.querySelectorAll(".page-selector").forEach(function(pageSelector) {
    
    pageSelector.addEventListener('change', function() {
        canAnimate = false;
        if(this.value == 0){      cont.scroll({ top:0,left: 0,behavior: 'smooth'});canAnimate=true;}
        else if(this.value == 1) cont.scroll({ top:0,left: parseInt(screen.width/1.5),behavior: 'smooth'});
        else if(this.value == 2) cont.scroll({ top:0,left: cont.scrollWidth / 1,behavior: 'smooth'});
    });
    
});

let curr = 0; let maxAnimation = 7;
let canAnimate = true;
let myRange = document.getElementById("myrange");
setInterval(()=>{
    if(!canAnimate) return;

    if(curr == 0) $("#me"+maxAnimation).css({"opacity":"0"});
    else $("#me"+(curr-1)).css({"opacity":"0"});

    $("#me"+curr).css({"opacity":"100"});

    curr += 1;
    if(curr == maxAnimation+1) curr = 0;
    myRange.value = curr;
},200);

$('input[type=range]').on('input', function () {
    if(canAnimate) return;
    
    $("#me"+curr).css({"opacity":"0"});
    $("#me"+(curr-1)).css({"opacity":"0"});
    $("#me"+(curr+1)).css({"opacity":"0"});
    $("#me"+parseInt(this.value)).css({"opacity":"100"});

    curr = parseInt(this.value);
});


$("#myrange").hover(() => {canAnimate = false;})

$("#myrangeBox").hover(
    () => {canAnimate = false;}, () => {canAnimate = true;}    
)

function prevProjectImage(data){
    let alldata = $(data)[0];
    $(alldata.dataset.imageid+alldata.dataset.curr).css({"opacity":"0"});

    if(parseInt(alldata.dataset.curr)-1 < 0) alldata.dataset.curr = alldata.dataset.max;
    else alldata.dataset.curr = parseInt(alldata.dataset.curr)-1;

    $(alldata.dataset.imageid+alldata.dataset.curr).css({"opacity":"100"});
}

function nextProjectImage(data){
    let alldata = $(data)[0];
    $(alldata.dataset.imageid+alldata.dataset.curr).css({"opacity":"0"});

    if(parseInt(alldata.dataset.curr)+1 >alldata.dataset.max) alldata.dataset.curr = 0;
    else alldata.dataset.curr = parseInt(alldata.dataset.curr)+1;

    $(alldata.dataset.imageid+alldata.dataset.curr).css({"opacity":"100"});
}



let index = 0,interval = 1000;
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3))
}


document.getElementById("cards").onmousemove = e => {
    for(const card of document.getElementsByClassName("card")) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
}


$(".wiggle").bind("webkitAnimationEnd mozAnimationEnd animationend", function(){
    $(this).removeClass("animated");
})
  
$(".wiggle").hover(function(){
    $(this).addClass("animated");
})