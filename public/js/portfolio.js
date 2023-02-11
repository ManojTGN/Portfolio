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