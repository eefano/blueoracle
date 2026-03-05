
const COLS = 85;
const ROWS = 39;

var weights = {
  'A': 	8.2 ,
  'B': 	1.5 ,
  'C': 	2.8 ,
  'D': 	4.3 ,
  'E': 	12.7 ,
  'F': 	2.2 ,
  'G': 	2.0 ,
  'H':	6.1 ,
  'I': 	7.0 ,
  'J': 	0.16 ,
  'K': 	0.77 ,
  'L': 	4.0 ,
  'M': 	2.4 ,
  'N': 	6.7 ,
  'O': 	7.5 ,
  'P': 	1.9 ,
  'Q': 	0.12 ,
  'R': 	6.0 ,
  'S': 	6.3 ,
  'T': 	9.1 ,
  'U': 	2.8 ,
  'V': 	0.98 ,
  'W': 	2.4 ,
  'X': 	0.15 ,
  'Y': 	2.0 ,
  'Z': 	0.074 ,
}
var total

function gimmeletter()
{
  if (total === undefined)
  {
    total = 0.0;
    for (const [key, value] of Object.entries(weights)) {
      total += value;
    }
  }

  const dice = Math.random() * total;
  let partial = 0.0;

  for (const [key, value] of Object.entries(weights)) {
    partial += value;
    if (dice <= partial) return key;
  }

}


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

function vowel(s) {
  return s == 'A' || s == 'E' || s == 'I' || s == 'O' || s == 'U' || s == 'Y'
}
function consonant(s) {
  if (vowel(s)) return false;
  if (s == ".") return false;
  return true;
}

var tick = 0;
function step() {
  window.requestAnimationFrame(step);

  const i = Math.random() * COLS >> 0
  const j = Math.random() * ROWS >> 0

  const c = videoscii[i + j * COLS]

  const l = videoscii[(i + COLS-1) % COLS + j * COLS].textContent
  const r = videoscii[(i + 1) % COLS + j * COLS].textContent
  const u = videoscii[i + ((j + ROWS-1) % ROWS) * COLS].textContent
  const d = videoscii[i + ((j + 1) % ROWS) * COLS].textContent

  const vowels = vowel(l) + vowel(r) + vowel(u) + vowel(d)
  const consonants = consonant(l) + consonant(r) + consonant(u) + consonant(d)

  c.textContent = gimmeletter()  // String.fromCharCode(Math.random() * 26 + 65);

  if (vowels > 2) {
    while (vowel(c.textContent)) {
      c.textContent = String.fromCharCode(Math.random() * 26 + 65);
    }
  }
  else if (consonants > 2) {
    while (consonant(c.textContent)) {
      c.textContent = String.fromCharCode(Math.random() * 26 + 65);
    }
  }

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
  canvas.style.fontSize = (k / COLS) + "em";
}

function load() {

  resize();
  refocus();

  const canvas = document.getElementById("gamecanvas");

  let c = "";
  let r = "";

  for (let j = 0; j < ROWS; j++) {
    r = r + "1.225em "

    for (let i = 0; i < COLS; i++) {
      if (j == 0) c = c + "1em "

      const elem = document.createElement("span");
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

