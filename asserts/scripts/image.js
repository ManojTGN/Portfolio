const imageGroup = document.getElementById("image-group");
const imageSlider = document.getElementsByClassName("img-slider")[0];
var IMAGE_SLIDE = undefined;
var ImSl_PAUSED = false;


if(window.location.href.split("/")[3] == 'index.html')
setInterval(()=>{
    document.getElementById("me"+imageGroup.dataset.curr).style.opacity = 0;
    document.getElementById("me"+imageGroup.dataset.curr).style.position = 'absolute';
    
    if(imageGroup.dataset.curr+1 > imageGroup.dataset.max) imageGroup.dataset.curr = 0;
    else imageGroup.dataset.curr = parseInt(imageGroup.dataset.curr)+1;
    
    document.getElementById("me"+imageGroup.dataset.curr).style.opacity = 1;
    document.getElementById("me"+imageGroup.dataset.curr).style.position = 'static';
},150);

if(window.location.href.split("/")[3] == 'project.html')
document.getElementsByClassName("img-slider")[0].addEventListener("click", event => {
    if(event.target.dataset.right == undefined || event.target.className == "img-slider-active") return;
    
    if( document.getElementsByClassName('img-slider-active').length > 0 ){
        document.getElementsByClassName("img-slider-active")[0].classList.toggle("img-slider-active");
    }

    let parent = event.target.parentNode;
    event.target.classList.toggle("img-slider-active");
    
    parent.parentNode.dataset.curr = event.target.dataset.right;
    document.getElementsByClassName("img-selector")[0].style.right = `${parseInt(imageSlider.dataset.curr)*100 }%`;

    if(ImSl_PAUSED == false){
        clearInterval(IMAGE_SLIDE);
        IMAGE_SLIDE = setInterval(changeNextImage,5000);
    }
});

if(window.location.href.split("/")[3] == 'project.html')
IMAGE_SLIDE = setInterval(changeNextImage,5000);

function changeNextImage(){
    if(ImSl_PAUSED == true){
        return;
    }

    if( document.getElementsByClassName('img-slider-active').length > 0 ){
        document.getElementsByClassName("img-slider-active")[0].classList.toggle("img-slider-active");
    }
    
    if(imageSlider.dataset.curr >= imageSlider.dataset.max){
        imageSlider.dataset.curr = 0;
        if(document.getElementsByClassName("project-imageslide-active")[0].children.length > 0){
            document.getElementsByClassName("project-imageslide-active")[0].children.item(0).classList.toggle("img-slider-active");
        }
    }else{
        imageSlider.dataset.curr = parseInt(imageSlider.dataset.curr) + 1;
        document.getElementsByClassName("project-imageslide-active")[0].children.item(parseInt(imageSlider.dataset.curr)).classList.toggle("img-slider-active");
    }

    document.getElementsByClassName("img-selector")[0].style.right = `${parseInt(imageSlider.dataset.curr)*100 }%`;
}