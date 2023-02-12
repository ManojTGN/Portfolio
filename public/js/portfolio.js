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
                })
                .join("");
            
            if(iteration >= event.target.dataset.value.length) clearInterval(intervel);
            iteration += 1 / 3;
        },30); 
    };
    
});

document.querySelectorAll(".page-selector").forEach(function(pageSelector) {
    let cont = document.getElementsByClassName("container")[0];
    pageSelector.addEventListener('change', function() {
        if(this.value == 0){
            cont.scroll({ left: 0,behavior: 'smooth'});
        }else if(this.value == 1){
            cont.scroll({ left: parseInt( screen.width / 2),behavior: 'smooth'});
        }else if(this.value == 2){
            cont.scroll({ left: cont.scrollWidth / 1,behavior: 'smooth'});
        }
    });
    
});

// let isMouseDown = false;
// document.querySelectorAll('.top-box').forEach(function(topBox) {
    
//     let cont = document.getElementsByClassName("container")[0];

//     topBox.onmousedown = event => {
//         isMouseDown = true;
//     };

//     topBox.onmousemove = event => {
//         if(!isMouseDown) return;
        
//         cont.scroll({
//             left: parseInt( (event.clientX/cont.scrollWidth /*screen.width*/)  * cont.scrollWidth),
//             behavior: 'auto'
//         });

//         let scroll = (event.clientX/cont.scrollWidth) * 100;
//         let pageSelector = document.querySelectorAll(".page-selector");
//         if     (scroll <  33.3) pageSelector[0].checked = true;
//         else if(scroll >= 66.6) pageSelector[1].checked = true;
//         else if(scroll >= 33.3) pageSelector[2].checked = true;
//         console.log(scroll,cont.scrollLeft,screen.width,cont.scrollWidth);
        
//     }

//     topBox.onmouseup = event => {
//         isMouseDown = false;
//     }
    
// });




let index = 0,interval = 1000;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

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