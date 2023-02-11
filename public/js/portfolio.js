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