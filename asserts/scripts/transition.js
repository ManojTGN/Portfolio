const CONC = document.getElementsByClassName('container')[0];
const ABOUT = document.getElementsByClassName('about')[0];
const PROJECT = document.getElementsByClassName('project')[0];
const BLOG = document.getElementsByClassName('blog')[0];


function openPage(page){
    CONC.animate( [ { opacity: '1' }, { opacity: '0' } ], { duration: 100, easing: 'ease-in-out', fill: 'both' });
    setTimeout( ()=>{
        if(page == '0'){ window.location.href = "../about.html" }
        else if(page == '1'){ window.location.href = "../project.html" }
        else{ window.location.href = "../blog.html" }
    },150);
}

function closePage(page){
    CONC.animate( [ { opacity: '1' }, { opacity: '0' } ], { duration: 100, easing: 'ease-in-out', fill: 'both' });
    setTimeout( ()=>{
        window.location.href = "../index.html";
    },150);
}

function changeProject(element) {

    document.getElementById("project_sidebar_"+element.parentNode.dataset.curr).classList.toggle("project-sidebar-active");
    document.getElementById("project_sidebar_"+element.value).classList.toggle("project-sidebar-active");

    document.getElementById("project_detail_"+element.parentNode.dataset.curr).classList.toggle("project-detail-active");
    document.getElementById("project_detail_"+element.value).classList.toggle("project-detail-active");

    document.getElementById("project_image_"+element.parentNode.dataset.curr).classList.toggle("project-image-active");
    document.getElementById("project_image_"+element.value).classList.toggle("project-image-active");

    document.getElementById("project_imageslide_"+element.parentNode.dataset.curr).classList.toggle("project-imageslide-active");
    document.getElementById("project_imageslide_"+element.value).classList.toggle("project-imageslide-active");

    document.getElementsByClassName('img-slider')[0].dataset.curr = 0;
    document.getElementsByClassName('img-slider')[0].dataset.max = document.getElementsByClassName('img-selector')[0].children.item(parseInt(element.value)).children.length - 1;

    if( document.getElementsByClassName('img-slider-active').length > 0 ){
        document.getElementsByClassName('img-slider-active')[0].classList.toggle("img-slider-active");
    }
    if( document.getElementById("project_imageslide_"+element.value).children.length > 0 ){
        document.getElementById("project_imageslide_"+element.value).children.item(0).classList.toggle("img-slider-active");
    }

    document.getElementsByClassName('img-selector')[0].style.right="0%";
    document.getElementsByClassName('img-selector')[0].style.width=( (parseInt(document.getElementsByClassName('img-slider')[0].dataset.max)+1) * 100 )+"%";

    element.parentNode.dataset.curr = element.value;

    if(ImSl_PAUSED == false){
        clearInterval(IMAGE_SLIDE);
        IMAGE_SLIDE = setInterval(changeNextImage,5000);
    }
}

function changeNextProject(number){
    let element = document.getElementById("project_sidebar");

    if( parseInt(element.dataset.curr) + number > element.dataset.max) element.children.item(0).value = 0;
    else if(parseInt(element.dataset.curr) + number < 0) element.children.item(0).value = element.dataset.max;
    else element.children.item(0).value = parseInt(element.dataset.curr) + number;

    element.children.item(0).onchange();
}

document.querySelectorAll('.img-slider-option').forEach((element=>{
    element.firstElementChild.addEventListener('click',(event)=>{
        if( parseInt(event.target.dataset.pause) == 0 ){
            event.target.dataset.pause = 1;
            event.target.classList.toggle('fa-regular');
            event.target.classList.toggle('fa-solid');
            clearInterval(IMAGE_SLIDE);
            ImSl_PAUSED = true;
        }else{
            event.target.dataset.pause = 0;
            event.target.classList.toggle('fa-regular');
            event.target.classList.toggle('fa-solid');
            IMAGE_SLIDE = setInterval(changeNextImage,5000);
            ImSl_PAUSED = false;
            changeNextImage();
        }
    })
}));