const t_ABOUT = document.getElementsByClassName('about-trigger')[0];
const t_PROJECT = document.getElementsByClassName('project-trigger')[0];
const t_BLOG = document.getElementsByClassName('blog-trigger')[0];

const CONC = document.getElementsByClassName('container')[0];
const ABOUT = document.getElementsByClassName('about')[0];
const PROJECT = document.getElementsByClassName('project')[0];
const BLOG = document.getElementsByClassName('blog')[0];

const b_ABOUT = document.getElementsByClassName('about-back')[0];
const b_PROJECT = document.getElementsByClassName('project-back')[0];
const b_BLOG = document.getElementsByClassName('blog-back')[0];

t_ABOUT.addEventListener('click', function (event) {
    CONC.style.filter = "blur(20px)";
    ABOUT.classList.toggle("z-index-0");
    ABOUT.classList.toggle("z-index-2");
    ABOUT.style.opacity = 1;
});
b_ABOUT.addEventListener('click', function (event) {
    CONC.style.filter = "blur(0px)";
    ABOUT.classList.toggle("z-index-0");
    ABOUT.classList.toggle("z-index-2");
    ABOUT.style.opacity = 0;
});

t_PROJECT.addEventListener('click', function (event) {
    CONC.style.filter = "blur(20px)";
    PROJECT.classList.toggle("z-index-0");
    PROJECT.classList.toggle("z-index-2");
    PROJECT.style.opacity = 1;
});
b_PROJECT.addEventListener('click', function (event) {
    CONC.style.filter = "blur(0px)";
    PROJECT.classList.toggle("z-index-0");
    PROJECT.classList.toggle("z-index-2");
    PROJECT.style.opacity = 0;
});

t_BLOG.addEventListener('click', function (event) {
    CONC.style.filter = "blur(20px)";
    BLOG.classList.toggle("z-index-0");
    BLOG.classList.toggle("z-index-2");
    BLOG.style.opacity = 1;
});
b_BLOG.addEventListener('click', function (event) {
    CONC.style.filter = "blur(0px)";
    BLOG.classList.toggle("z-index-0");
    BLOG.classList.toggle("z-index-2");
    BLOG.style.opacity = 0;
});