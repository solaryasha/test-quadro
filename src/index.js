let detail = {
  length: 0,
  width: 0,
  lt: { radius: 0 },
  lb: { radius: 0 },
  rt: { radius: 0 },
  rb: { radius: 0 }
};


const heightInput = document.getElementById("heightInput");
const widthInput = document.getElementById("widthInput");
const rightAngleInput = document.getElementById("rightAngleInput");
const rotateZ = document.getElementById("rotateZ");
const corners = ['rt', 'rb', 'lb', 'lt'];
let cornerIndex = 0;
const svg = document.getElementById("svg");
svg.setAttribute("width",  window.innerWidth);
svg.setAttribute("height", window.innerHeight + 100);


rotateZ.addEventListener('click', () => {
  const nextCorner = cornerIndex < 3 ? corners[cornerIndex + 1] : corners[0];
  const currentCorner = corners[cornerIndex]; 

  detail[nextCorner].radius =  detail[currentCorner].radius
  detail[currentCorner].radius = 0;

  if(cornerIndex < 3) {
    cornerIndex++;
  } else {
    cornerIndex = 0;
  }
  
  buildRectangle();
});

heightInput.addEventListener('input', (event) => {
  detail.length = Number(event.target.value);
  buildRectangle();
});

widthInput.addEventListener('input', (event) => {
  detail.width = Number(event.target.value);
  buildRectangle();
});

rightAngleInput.addEventListener('input', (event) => {
  const currentCorner = corners[cornerIndex];

  detail[currentCorner].radius = Number(event.target.value);
  buildRectangle();
});

function p(x,y){
  return x+" "+y+" ";
}

function rectangle(x, y, w, h, r1, r2, r3, r4){
  var strPath = "M"+p(x+r1,y); 
  strPath+="L"+p(x+w-r2,y)+"Q"+p(x+w,y)+p(x+w,y+r2); 
  strPath+="L"+p(x+w,y+h-r3)+"Q"+p(x+w,y+h)+p(x+w-r3,y+h); 
  strPath+="L"+p(x+r4,y+h)+"Q"+p(x,y+h)+p(x,y+h-r4); 
  strPath+="L"+p(x,y+r1)+"Q"+p(x,y)+p(x+r1,y); 
  strPath+="Z";

  return strPath;
}

function buildRectangle() {
  document.getElementById('path').setAttribute('d', rectangle(0, 0, detail.width, detail.length, detail.lt.radius, detail.rt.radius, detail.rb.radius, detail.lb.radius))
}