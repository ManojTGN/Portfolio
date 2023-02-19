const imageGroup = document.getElementById("image-group");

setInterval(()=>{
    document.getElementById("me"+imageGroup.dataset.curr).style.opacity = 0;
    
    if(imageGroup.dataset.curr+1 > imageGroup.dataset.max) imageGroup.dataset.curr = 0;
    else imageGroup.dataset.curr = parseInt(imageGroup.dataset.curr)+1;
    
    document.getElementById("me"+imageGroup.dataset.curr).style.opacity = 100;
},150);