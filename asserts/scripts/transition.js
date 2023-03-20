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
    setTimeout(()=>{ ABOUT.style.opacity = 1; },250);
});
b_ABOUT.addEventListener('click', function (event) {
    CONC.style.filter = "blur(0px)";
    ABOUT.style.opacity = 0;
    setTimeout(()=>{
        ABOUT.classList.toggle("z-index-0");
        ABOUT.classList.toggle("z-index-2");
    },250);
});

t_PROJECT.addEventListener('click', function (event) {
    setTimeout(()=>{
    IMAGE_SLIDE = setInterval(image_slide,200);
    },600)
    CONC.style.filter = "blur(20px)";
    PROJECT.classList.toggle("z-index-0");
    PROJECT.classList.toggle("z-index-2");
    setTimeout(()=>{ PROJECT.style.opacity = 1; },250);
});
b_PROJECT.addEventListener('click', function (event) {
    clearInterval(IMAGE_SLIDE);
    CONC.style.filter = "blur(0px)";
    PROJECT.style.opacity = 0;
    setTimeout(()=>{
        PROJECT.classList.toggle("z-index-0");
        PROJECT.classList.toggle("z-index-2");
    },250);

    document.getElementsByClassName('img-selector')[0].style.right="0%";
    document.documentElement.style.setProperty('--slider-width', '0px');
});

t_BLOG.addEventListener('click', function (event) {
    CONC.style.filter = "blur(20px)";
    BLOG.classList.toggle("z-index-0");
    BLOG.classList.toggle("z-index-2");
    setTimeout(()=>{ BLOG.style.opacity = 1; },250);
});
b_BLOG.addEventListener('click', function (event) {
    CONC.style.filter = "blur(0px)";
    BLOG.style.opacity = 0;
    setTimeout(()=>{
        BLOG.classList.toggle("z-index-0");
        BLOG.classList.toggle("z-index-2");
    },250);
});


function loadProjectData(project){
    if(project == undefined) return;
    project = project.replace('a','p',1);

    let _id = document.getElementById("Project").dataset.curr;
    document.getElementById("Project").dataset.curr = project;
        
    document.getElementById(_id).classList.toggle("z-index-1");
    document.getElementById(_id).classList.toggle("z-index-0");

    document.getElementById(_id).classList.toggle("opacity-1");
    document.getElementById(_id).classList.toggle("opacity-0");

    document.getElementsByClassName('img-toolkit')[0].style.opacity = 0;
    document.getElementsByClassName('img-selector')[0].style.opacity = 0;

    setTimeout(()=>{
        document.getElementById(project).classList.toggle("z-index-1");
        document.getElementById(project).classList.toggle("z-index-0");

        document.getElementById(project).classList.toggle("opacity-1");
        document.getElementById(project).classList.toggle("opacity-0");

        if(project == 'p1_0'){
            document.documentElement.style.setProperty('--slider-width', '0px');
            document.getElementsByClassName('img-slider')[0].dataset.curr = 0;
            document.getElementsByClassName('img-slider')[0].dataset.max = 3;
            document.getElementsByClassName('img-slider')[0].innerHTML = `
            <div data-right="0" class="img-slider-active"></div>
            <div data-right="1" ></div>
            <div data-right="2" ></div>
            <div data-right="3" ></div>
            `;
            document.getElementsByClassName('img-selector')[0].style.width="400%";
            document.getElementsByClassName('img-selector')[0].style.right="0%";
            document.getElementsByClassName('img-selector')[0].innerHTML = `
            <div class="w-100 d-flex justify-content-center align-items-center overflow-hidden"><img src="asserts/images/projects/grievanceforum0.jpg" class="w-100" draggable="false"/></div>
            <div class="w-100 d-flex justify-content-center align-items-center overflow-hidden"><img src="asserts/images/projects/grievanceforum1.jpg" class="w-100" draggable="false"/></div>
            <div class="w-100 d-flex justify-content-center align-items-center overflow-hidden"><img src="asserts/images/projects/grievanceforum2.jpg" class="w-100" draggable="false"/></div>
            <div class="w-100 d-flex justify-content-center align-items-center overflow-hidden"><img src="asserts/images/projects/grievanceforum3.jpg" class="w-100" draggable="false"/></div>
            `;
        }else if(project == 'p1_1'){
            document.getElementById('project-description').innerHTML = `AliveBoard is a powerful and intuitive web application that allows for real-time collaboration on a shared whiteboard. It is built using Node.js and React, making it fast, reliable, and responsive. The application's clean and modern interface makes it easy for users to get started, with no need for complex installations or plugins.
            <br><br>One of the key features of AliveBoard is its ability to enable real-time collaboration among multiple users. This means that users can invite friends or colleagues to join the whiteboard and work on it together in real-time, with changes and updates immediately visible to all participants. This makes it ideal for remote teams, classrooms, or any other scenario where collaboration is essential.
            <br><br>The application includes a range of powerful drawing tools, such as pens, pencils, shapes, and text, allowing users to express their creativity in a variety of ways. The drawing tools are easy to use and customizable, allowing users to create the exact look and feel they want for their drawings.
            <br><br>To ensure a safe and productive environment, AliveBoard includes moderation features that allow for easy monitoring of user activity. Moderators can easily remove any inappropriate content or behavior, ensuring a safe and enjoyable experience for all users.
            <br><br>Overall, AliveBoard is an innovative and versatile web application that provides a powerful and easy-to-use platform for collaborative drawing and brainstorming. With its real-time collaboration features, customizable drawing tools, and moderation features, it is an essential tool for remote teams, classrooms, or any other scenario where collaborative drawing and brainstorming are necessary.`;
            document.getElementById('project-resource').innerHTML =`
            <span class="margin-right-5"><i class="fa-brands fa-node font-size-50"></i></span>
            <span class="margin-right-5 margin-bottom-2"><i class="devicon-express-original-wordmark font-size-100"></i></span>
            <span class="margin-right-5 margin-bottom-2"><i class="devicon-react-original-wordmark font-size-100"></i></span>
            <span class="margin-right-5 margin-bottom-3"><i class="devicon-mysql-plain-wordmark font-size-100"></i></span>
            `;
            document.getElementById('project-features').innerHTML =`
            <div class="col">
            <ul><li class="margin-5"><i class="fa-solid fa-user-check"></i> Moderation System</li></ul>
            </div>
            <div class="col">
            <ul><li class="margin-5"><i class="fa-brands fa-flipboard"></i> Board Room System</li></ul>
            </div>
            <div class="col">
            <ul><li class="margin-5"><i class="fa-regular fa-face-smile-beam"></i> User-Friendly</li></ul>
            </div>`;
            document.getElementById('project-link').innerHTML = `
            <span class="margin-right-5"><a target="_blank" href="https://github.com/ManojTGN/aliveboard"><i class="fa-brands fa-github"></i> Github<i class="fa-solid fa-arrow-up-right-from-square font-size-15"></i></a></span>
            `;

            document.documentElement.style.setProperty('--slider-width', '0px');
            document.getElementsByClassName('img-slider')[0].dataset.curr = 0;
            document.getElementsByClassName('img-slider')[0].dataset.max = 2;
            document.getElementsByClassName('img-slider')[0].innerHTML = `
            <div data-right="0" class="img-slider-active"></div>
            <div data-right="1" ></div>
            <div data-right="2" ></div>
            `;
            document.getElementsByClassName('img-selector')[0].style.width="300%";
            document.getElementsByClassName('img-selector')[0].style.right="0%";
            document.getElementsByClassName('img-selector')[0].innerHTML = `
            <div class="w-100 d-flex justify-content-center align-items-center overflow-hidden"><img src="asserts/images/projects/aliveboard0.jpg" class="w-100" draggable="false"/></div>
            <div class="w-100 d-flex justify-content-center align-items-center overflow-hidden"><img src="asserts/images/projects/aliveboard1.jpg" class="w-100" draggable="false"/></div>
            <div class="w-100 d-flex justify-content-center align-items-center overflow-hidden"><img src="asserts/images/projects/aliveboard2.jpg" class="w-100" draggable="false"/></div>
            `;
        }else if(project == 'p1_2'){
            document.getElementById('project-description').innerHTML = `The project that you have developed is a Python program that utilizes the Pillow library to create an ASCII art representation of any image or video. The program has the capability to accept input images or videos from internet links, making it a versatile tool for creating ASCII art from a wide range of sources.
            <br><br>The process of creating ASCII art involves converting the original image or video into a text-based representation using ASCII characters, such as letters, numbers, and symbols. This technique has been used for decades as a way to create visual art from digital media, and it has seen a resurgence in popularity in recent years as a nostalgic and creative way to represent images.
            <br><br>Your program uses the Pillow library to access the pixels of the input image or video and then converts those pixels into ASCII characters based on their brightness and contrast. The resulting ASCII art can be output as a new image or video file, preserving the visual style of the original while providing a unique and interesting representation.
            <br><br>Overall, The project is a creative and innovative use of Python and the Pillow library to create ASCII art from a wide range of sources. It offers a fun and engaging way to explore the visual potential of digital media, and it has the potential to inspire creativity and experimentation in users of all skill levels.`;
            document.getElementById('project-resource').innerHTML =`
            <span class="margin-right-5"><i class="devicon-python-plain-wordmark font-size-100"></i></span>
            `;
            document.getElementById('project-features').innerHTML =`
            <div class="col">
            <ul><li class="margin-5"><i class="fa-solid fa-palette"></i> Fully Customizable</li></ul>
            </div>
            <div class="col">
            <ul><li class="margin-5"><i class="fa-solid fa-layer-group"></i> 3 Ascii Representation</li></ul>
            </div>
            <div class="col">
            <ul><li class="margin-5"><i class="fa-solid fa-globe"></i> Supports Online Image/Video</li></ul>
            </div>
            `;
            document.getElementById('project-link').innerHTML = `
            <span class="margin-right-5"><a target="_blank" href="https://github.com/ManojTGN/Ascii-Converter/releases/tag/v0.1.0"><i class="fa-solid fa-file-arrow-down"></i> Download<i class="fa-solid fa-arrow-up-right-from-square font-size-15"></i></a></span>
                <span class="margin-right-5"><a target="_blank" href="https://github.com/ManojTGN/Ascii-Converter"><i class="fa-brands fa-github"></i> Github<i class="fa-solid fa-arrow-up-right-from-square font-size-15"></i></a></span>
            `;

            document.documentElement.style.setProperty('--slider-width', '0px');
            document.getElementsByClassName('img-slider')[0].dataset.curr = 0;
            document.getElementsByClassName('img-slider')[0].dataset.max = 3;
            document.getElementsByClassName('img-slider')[0].innerHTML = `
            <div data-right="0" class="img-slider-active"></div>
            <div data-right="1" ></div>
            <div data-right="2" ></div>
            <div data-right="3" ></div>
            `;
            document.getElementsByClassName('img-selector')[0].style.width="400%";
            document.getElementsByClassName('img-selector')[0].style.right="0%";
            document.getElementsByClassName('img-selector')[0].innerHTML = `
            <div class="w-100 d-flex justify-content-center align-items-center overflow-hidden"><img src="asserts/images/projects/asciiconvertor0.jpg" class="w-100" draggable="false"/></div>
            <div class="w-100 d-flex justify-content-center align-items-center overflow-hidden"><img src="asserts/images/projects/asciiconvertor1.jpg" class="w-100" draggable="false"/></div>
            <div class="w-100 d-flex justify-content-center align-items-center overflow-hidden"><img src="asserts/images/projects/asciiconvertor2.jpg" class="w-100" draggable="false"/></div>
            <div class="w-100 d-flex justify-content-center align-items-center overflow-hidden"><img src="asserts/images/projects/asciiconvertor3.jpg" class="w-100" draggable="false"/></div>
            `;
        }else if(project == 'p1_3'){
            document.getElementById('project-description').innerHTML = `ControMouse is an innovative utility that allows couch-oriented PC users to control their computer using an Xbox or PlayStation controller. The utility is built using C programming language and the XInput library is used to enable controller inputs to be translated into traditional keyboard and mouse inputs.
            <br><br>ControMouse is particularly useful for users who want to sit back and relax on the couch while browsing the web, playing games, or controlling media players. With ControMouse, users can use their controller to interact with most applications and games that require keyboard and mouse input.
            <br><br>The utility offers a range of customization options, allowing users to adjust the sensitivity of their controller, assign specific keys to different controller buttons, and customize the behavior of the controller's triggers and analog sticks. This means that users can fine-tune their controller settings to suit their specific needs, providing a highly personalized and comfortable user experience.
            <br><br>One of the key features of ControMouse is its compatibility with most applications and games. The utility can be easily customized to work with any application or game, providing users with a simple and convenient solution for using their controller instead of a keyboard and mouse.
            <br><br>ControMouse is particularly useful for PC gaming from the couch, as it allows users to play games that require keyboard and mouse input with their controller, providing a more comfortable and relaxing gaming experience. With ControMouse, users can easily customize their controller settings to suit their individual preferences, providing a personalized gaming experience.
            <br><br>Overall, ControMouse is a powerful and user-friendly utility that provides a simple and convenient solution for couch-oriented PC users who prefer to use a controller rather than a keyboard and mouse. With its compatibility with most applications and games, customization options, and support for Xbox and PlayStation controllers, it is an essential tool for anyone who wants to control their PC from the couch.`;
            document.getElementById('project-resource').innerHTML =`
            <span class="margin-right-5"><i class="devicon-c-line-wordmark font-size-100"></i></span>
            `;
            document.getElementById('project-features').innerHTML =`
            <div class="col">
            <ul><li class="margin-5"><i class="fa-solid fa-gamepad"></i> Support All Controller</li></ul>
            </div>
            <div class="col">
            <ul><li class="margin-5"><i class="fa-solid fa-palette"></i> Customizable</li></ul>
            </div>
            <div class="col">
            </div>
            `;
            document.getElementById('project-link').innerHTML = `
            <span class="margin-right-5"><a target="_blank" href="https://github.com/ManojTGN/ControMouse"><i class="fa-brands fa-github"></i> Github<i class="fa-solid fa-arrow-up-right-from-square font-size-15"></i></a></span>
            `;

            document.documentElement.style.setProperty('--slider-width', '0px');
            document.getElementsByClassName('img-slider')[0].dataset.curr = 0;
            document.getElementsByClassName('img-slider')[0].dataset.max = 0;
            document.getElementsByClassName('img-slider')[0].innerHTML = `
            `;
            document.getElementsByClassName('img-selector')[0].style.width="100%";
            document.getElementsByClassName('img-selector')[0].style.right="0%";
            document.getElementsByClassName('img-selector')[0].innerHTML = `
            <div class="w-100 d-flex justify-content-center align-items-center overflow-hidden"><img src="asserts/images/projects/contromouse0.jpg" class="w-100" draggable="false"/></div>
            `;
        }

        setTimeout(()=>{
            document.getElementsByClassName('img-toolkit')[0].style.opacity = 1;
            document.getElementsByClassName('img-selector')[0].style.opacity = 1;
        },150);
    },200);
}

document.querySelectorAll('.accordion-item').forEach(element =>{
    element.addEventListener("click", event => {
        
        let parent = event.target;
        while(parent.dataset.curr == undefined)
        parent = parent.parentNode;
        
        if(parent.dataset.curr != element.id){
            element.style.height = "700px";
            document.getElementById(parent.dataset.curr).style.height = "50px";
            loadProjectData(element.id);
        }else{
            if(element.style.height == "700px") document.getElementById(parent.dataset.curr).style.height = "50px";
            else document.getElementById(parent.dataset.curr).style.height = "700px";
        }
        parent.dataset.curr = element.id;
    });
});

document.querySelectorAll('.scroll-down').forEach(element =>{
    setInterval(()=>{
        element.style.marginTop = element.style.marginTop=='10px'?'0px':'10px';
    },500);
});

document.querySelectorAll('.img-slider-option').forEach((element=>{
    element.firstElementChild.addEventListener('click',(event)=>{
        if( parseInt(event.target.dataset.pause) == 0 ){
            event.target.dataset.pause = 1;
            event.target.classList.toggle('fa-regular');
            event.target.classList.toggle('fa-solid');
            clearInterval(IMAGE_SLIDE);
        }else{
            event.target.dataset.pause = 0;
            event.target.classList.toggle('fa-regular');
            event.target.classList.toggle('fa-solid');
            IMAGE_SLIDE = setInterval(image_slide,200);
        }
    })
}));