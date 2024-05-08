const shapes = document.getElementById("shapes");

function createShape(){
    let shape =  document.createElement("div");

    let width = Math.floor(Math.random() * 50);
    shape.style.width = `${width}px`;
    shape.style.height = `${width}px`;

    shape.style.position = `absolute`;
    shape.style.top  = `${Math.floor(Math.random() * 95)}%`;
    shape.style.left = `${Math.floor(Math.random() * 95)}%`;

    shape.style.opacity = "0";
    shape.style.fontSize = "40px";
    shape.style.transition = "all 10s ease";
    shape.style.rotate = `${Math.floor(Math.random() * 360)}deg`;
    shape.style.color = "rgba(255,255,255,.2)";

    let ran = Math.floor(Math.random() * 5);
    let icn = document.createElement("i");

    if(0 == ran) icn.className = "fa-regular fa-heart";
    else if(1 == ran) icn.className = "fa-regular fa-star";
    else if(2 == ran) icn.className = "fa-regular fa-circle";
    else if(3 == ran) icn.className = "fa-regular fa-square";
    else if(4 == ran) icn.className = "fa-regular fa-snowflake";
    shape.appendChild(icn);
    
    return shape;
}

if(window.location.href.split("/")[3] == 'index.html' || window.location.href.split("/")[3] == '')
setInterval(()=>{

    let s = shapes.children[ parseInt(shapes.dataset.now) ];

    s.style.top  = `${Math.floor(Math.random() * 95)}%`;
    s.style.left = `${Math.floor(Math.random() * 95)}%`;

    s.style.rotate = `${Math.floor(Math.random() * 360)}deg`;
    if(s.style.opacity == "0") s.style.opacity = 1;

    if(parseInt(shapes.dataset.now) < parseInt(shapes.dataset.elements)-1) shapes.dataset.now = parseInt(shapes.dataset.now) + 1;
    else shapes.dataset.now = 0;

},200);

if(window.location.href.split("/")[3] == 'index.html' || window.location.href.split("/")[3] == '')
for(let i = parseInt(shapes.dataset.elements); i  < parseInt(shapes.dataset.maxelements); i++){
    const shape = createShape();
    shapes.appendChild(shape);
    shapes.dataset.elements = parseInt(shapes.dataset.elements) + 1;
}