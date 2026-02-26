
const COLS = 80;
const ROWS = 37;

var videoscii = [];

var keystate = [];
var keytrigs = new Set();

function keydown(e) {
  if (keystate[e.code]) return;
  keystate[e.code] = true;
  keytrigs.add(e.code);
}
function keyup(e) {
  keystate[e.code] = false;
}

var tick = 0;
function step() {
  window.requestAnimationFrame(step);

  const i = Math.random() * COLS >> 0
  const j = Math.random() * ROWS >> 0

  const c = videoscii[i + j * COLS]

  c.textContent = String.fromCharCode(Math.random() * 26 + 65);

  c.style.backgroundColor = "RGB(0,0," + (Math.random() * 255 >> 0) + ")"

  tick++;
}

function refocus() {
  document.getElementById("gamecanvas").focus();
}

function resize() {
  const canvas = document.getElementById("gamecanvas");

  let h = window.innerHeight * window.devicePixelRatio;
  let w = window.innerWidth * window.devicePixelRatio;

  let kx = (w / 16);
  let ky = (h / 9);
  let k = 1;

  if (kx < ky) {
    if (kx > 1) k = kx;
    else k = 1;
  } else {
    if (ky > 1) k = ky;
    else k = 1;
  }
  k = k / window.devicePixelRatio;

  canvas.style.width = (16 * k) + "px";
  canvas.style.height = (9 * k) + "px";
  canvas.style.fontSize = (k / COLS ) + "em";
}

function load() {

  resize();
  refocus();
  
  const canvas = document.getElementById("gamecanvas");

  let c = "";
  let r = "";

  for (let j = 0; j < ROWS; j++) {
    r = r + "1.215em "

    for (let i = 0; i < COLS; i++) {
      if (j == 0) c = c + "1em "

      const elem = document.createElement("div");
      elem.setAttribute("id", i + "," + j);

      const text = document.createTextNode(".");
      elem.appendChild(text);

      canvas.appendChild(elem);

      videoscii[i + j * COLS] = elem;

    }
  }
  canvas.style.gridTemplateColumns = c
  canvas.style.gridTemplateRows = r


  window.addEventListener("resize", resize);
  window.addEventListener("keydown", keydown);
  window.addEventListener("keyup", keyup);
 
  window.requestAnimationFrame(step);  
}

export { load };

