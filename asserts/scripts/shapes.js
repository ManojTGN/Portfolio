const shapes = document.getElementById("shapes");

function createShape(){
    
    let shape =  document.createElement("div");
    shape.className = "shape";

    let width = Math.floor(Math.random() * 50);
    shape.style.width = `${width}px`;
    shape.style.height = `${width}px`;

    shape.style.top  = `${Math.floor(Math.random() * 95)}%`;
    shape.style.left = `${Math.floor(Math.random() * 95)}%`;

    shape.style.opacity = "0";
    shape.style.rotate = `${Math.floor(Math.random() * 360)}deg`;

    if(Math.floor(Math.random() * 100) < 40)
        shape.style.borderRadius = "50%";

    return shape;
}

setInterval(()=>{

    let s = shapes.children[ parseInt(shapes.dataset.now) ];

    s.style.top  = `${Math.floor(Math.random() * 95)}%`;
    s.style.left = `${Math.floor(Math.random() * 95)}%`;

    s.style.rotate = `${Math.floor(Math.random() * 360)}deg`;
    if(s.style.opacity == "0") s.style.opacity = 1;

    if(parseInt(shapes.dataset.now) < parseInt(shapes.dataset.elements)-1) shapes.dataset.now = parseInt(shapes.dataset.now) + 1;
    else shapes.dataset.now = 0;

},200);

for(let i = parseInt(shapes.dataset.elements); i  < parseInt(shapes.dataset.maxelements); i++){
    const shape = createShape();
    shapes.appendChild(shape);
    shapes.dataset.elements = parseInt(shapes.dataset.elements) + 1;
}