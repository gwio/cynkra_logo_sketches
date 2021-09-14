let width = window.innerWidth;
let height = window.innerHeight;

let gridSize = 4;
let itemSize = 40;
let spacing;
let spacingVal = 4;
let linie = false;
let invert = false;

let logoSize = (gridSize * itemSize) + (spacing * gridSize);

let times;
let millisFac = 20;
let millisAmt = 1000;
let rotPerItem = 8;
let rotationFac = 0.25;

function preload() {
  //img = loadImage('logo.png');
}

//-----------------------------------


function onTiles(value_) {
  gridSize = value_;
}

function onSpeed(value_) {
  millisFac = value_;
}

function onRotation(value_) {
  rotationFac = value_;
}

function onSpacing(value_) {
  spacingVal = value_;
}

function onRange(value_) {
  rotPerItem = value_;
}

function onStrich(value_) {
  linie = value_;
}

function onInvert(value_) {
  invert = value_;
}

//-----------------------------------


function setup() {
  createCanvas(width, height);
  var gui = QuickSettings.create(width - 300, 0, 'gui');

  gui.addRange('Grid Tiles', 2, 12, 4, 1, onTiles);
  gui.addRange('Spacing', 0, 50, 4, 1, onSpacing);
  gui.addRange('Speed', 1, 100, 20, 1, onSpeed);
  gui.addRange('Rotation 360/4', 0.25, 1.0, 0.25, 0.25, onRotation);
  gui.addRange('Range', 1, 20, 8, 1, onRange);
  gui.addBoolean('Strich', false, onStrich);
  gui.addBoolean('Invert Colors', false, onInvert);

  //noStroke();
  background(255);
  colorMode(HSB, 360, 100, 100);
  ellipseMode(CORNER);
  strokeCap(SQUARE);
  fill(212, 83, 72);
  stroke(212, 83, 72);
  angleMode(DEGREES);
  rectMode(CENTER);
  smooth();

  //--------------------------------------

}

function draw() {
  var blub = ((millisAmt * gridSize * gridSize) + (millisAmt * rotPerItem * 2));
  timesMain = (millis() * millisFac) % blub;
  timesMain = ease(map(timesMain, 0, blub, 0.0, 1.0));
  timesAlt = timesMain;
  spacing = sin(timesMain * 180) * spacingVal;
  timesMain = map(timesMain, 0.0, 1.0, 0.0, blub);
  if (invert) {
    background(212, 83, 72);
    fill(255);
    stroke(255);
  } else {
    background(255);
    fill(212, 83, 72);
    stroke(212, 83, 72);
  }
  smooth();
  push();
  logoSize = (gridSize * itemSize) + (spacing * gridSize);
  translate(width / 2, height / 2);
  translate(-logoSize / 2, -logoSize / 2);
  var counter = 0;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      push();

      translate(i * (itemSize + spacing), j * (itemSize + spacing));
      rangeStart = (counter * millisAmt) - (millisAmt * rotPerItem);
      rangeEnd = (counter * millisAmt) + (millisAmt * rotPerItem);
      var rotOffset = map(constrain(timesMain - (millisAmt * rotPerItem), rangeStart, rangeEnd), rangeStart, rangeEnd, 0, 360);
      rotate(rotOffset * rotationFac);
      if (!linie) {
        rect(0, 0, itemSize, itemSize);
      } else {
        rect(0, 0, itemSize * (timesAlt * 2 - 1), itemSize);
      }
      pop();
      counter += 1.0;
    }
  }
  pop();
}


function ease(v_) {

  return v_ < 0.5 ? 2 * v_ * v_ : v_ * (4 - 2 * v_) - 1;
}
