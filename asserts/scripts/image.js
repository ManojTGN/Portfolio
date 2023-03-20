const imageGroup = document.getElementById("image-group");

setInterval(()=>{
    document.getElementById("me"+imageGroup.dataset.curr).style.opacity = 0;
    
    if(imageGroup.dataset.curr+1 > imageGroup.dataset.max) imageGroup.dataset.curr = 0;
    else imageGroup.dataset.curr = parseInt(imageGroup.dataset.curr)+1;
    
    document.getElementById("me"+imageGroup.dataset.curr).style.opacity = 100;
},150);

document.getElementsByClassName("img-slider")[0].addEventListener("click", event => {
    if(event.target.dataset.right == undefined || event.target.className == "img-slider-active") return;
    
    let parent = event.target.parentNode;
    event.target.classList.toggle("img-slider-active");
    document.documentElement.style.setProperty('--slider-width', '0px');

    parent.children[ parseInt(parent.dataset.curr) ].classList.toggle("img-slider-active");
    parent.dataset.curr = event.target.dataset.right;

    document.getElementsByClassName("img-selector")[0].style.right = `${ parseInt(parent.dataset.curr)*100 }%`;
});

function image_slide(){
    let nextVal = parseInt(document.documentElement.style.getPropertyValue('--slider-width')) + 2;
    if(isNaN(nextVal)) nextVal = 0;

    document.documentElement.style.setProperty('--slider-width', `${nextVal}px`);
    if(nextVal >= 100){
        let parent = document.getElementsByClassName("img-slider")[0];
        if(parseInt(parent.dataset.max) == 0) return;

        parent.children[ parseInt(parent.dataset.curr) ].classList.toggle("img-slider-active");

        parent.dataset.curr = ( parseInt(parent.dataset.curr) != parseInt(parent.dataset.max) )?parseInt(parent.dataset.curr)+1:0;
        parent.children[ parseInt(parent.dataset.curr) ].classList.toggle("img-slider-active");

        document.documentElement.style.setProperty('--slider-width', '0px');
        document.getElementsByClassName("img-selector")[0].style.right = `${ parseInt(parent.dataset.curr)*100 }%`;
    }
}

var IMAGE_SLIDE = undefined;