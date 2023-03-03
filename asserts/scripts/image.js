const imageGroup = document.getElementById("image-group");

setInterval(()=>{
    document.getElementById("me"+imageGroup.dataset.curr).style.opacity = 0;
    
    if(imageGroup.dataset.curr+1 > imageGroup.dataset.max) imageGroup.dataset.curr = 0;
    else imageGroup.dataset.curr = parseInt(imageGroup.dataset.curr)+1;
    
    document.getElementById("me"+imageGroup.dataset.curr).style.opacity = 100;
},150);


// [document.getElementsByClassName("img-toolkit")]
document.querySelectorAll('.img-toolkit').forEach(element =>{
    
    //previous
    element.firstElementChild.addEventListener("click", event => {
        let parent = event.target.parentNode;
        if(parent.dataset.curr == undefined) parent = parent.parentNode;
        
        let mainParent = parent.parentNode;
        mainParent.children[ parseInt(parent.dataset.curr) ].style.opacity = 0;

        parent.dataset.curr = parseInt(parent.dataset.curr) - 1;
        if(parent.dataset.curr <= -1) parent.dataset.curr = parent.dataset.max;

        mainParent.children[ parseInt(parent.dataset.curr) ].style.opacity = 1;
    });

    //next
    element.lastElementChild.addEventListener("click", event => {
        let parent = event.target.parentNode;
        if(parent.dataset.curr == undefined) parent = parent.parentNode;
        
        let mainParent = parent.parentNode;
        mainParent.children[ parseInt(parent.dataset.curr) ].style.opacity = 0;

        parent.dataset.curr = parseInt(parent.dataset.curr) + 1;
        if(parent.dataset.curr > parseInt(parent.dataset.max)) parent.dataset.curr = 0;

        mainParent.children[ parseInt(parent.dataset.curr) ].style.opacity = 1;
    });
});