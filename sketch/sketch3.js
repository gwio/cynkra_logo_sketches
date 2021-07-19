let width = window.innerWidth;
let height = window.innerHeight;
let incre = width / 6;
let img;
let xoff = 0.0;
let xincrement = 0.0006;
let steps = 4;


let sat = 17;
let bright = 6;
let mainColor = 196;
let cnykraRnd = 53;
let noiseSeedVal = 123456;
let gradient = 15;
let useNoise = true;
let sWeight = 1.5;

function preload() {
  img = loadImage('logo.png');
}

//--------------------------------------

function onTiles(value_) {
  incre = width / value_;
  redraw();
}

function onSteps(value_) {
  steps = value_;
  redraw();
}

function onNoiseSteps(value_) {
  xincrement = value_;
  redraw();
}


function onSeed(value_) {
  noiseSeedVal = value_;
  redraw();
}

function onGradient(value_) {
  gradient = value_;
  redraw();
}

function onNoise(value_) {
  useNoise = value_;
  redraw();
}

function onStroke(value_) {
  sWeight = value_;
  redraw();
}


//--------------------------------------

function setup() {
  createCanvas(width, height);
  var gui = QuickSettings.create(width - 300, 0, 'gui');

  gui.addRange('Tiles', 3, 20, 6, 1, onTiles);
  gui.addRange('LinesSteps', 2, 20, steps, 1, onSteps);


  gui.addBoolean('Use Noise', true, onNoise);

  gui.addNumber('NoiseSeed', 0, 999999, noiseSeedVal, 1, onSeed);
  gui.addRange('xincrement', 0.001, 0.02, 0.008, 0.0001, onNoiseSteps);
  gui.addRange('stroke', 0.5, 20.0, 1.5, 0.01, onStroke);
  background(255);
  colorMode(HSB, 360, 100, 100);
  ellipseMode(CORNER);
  strokeCap(SQUARE);
  noLoop();

  //--------------------------------------

}

function draw() {
  xoff = 0.0;
  noiseSeed(noiseSeedVal);
  randomSeed(noiseSeedVal);
  background(255);
  image(img, 0, 0, img.width / 2, img.height / 2);
  stroke(0);
  strokeWeight(2);
  line(0, img.height, width, img.height);
  noStroke();
  // put drawing code here
  let xpos, ypos;
  let counter = 0;
  let current = 0;
  for (let i = img.height; i < height - incre; i += incre) {
    for (let j = 0; j < width - incre; j += incre) {
      counter++;
    }
  }
  for (let i = img.height; i < height - incre; i += incre) {
    for (let j = 0; j < width - incre; j += incre) {
      xpos = j;
      ypos = i;
      drawShape(xpos, ypos, current, counter, 1);
      xoff += xincrement;
      current++;
    }
    current++;
  }
}


function drawShape(x_, y_, current_, max_, scale_) {


  let pos = createVector(x_, y_);
  let rectSize = incre * 0.866;
  let lineSpace = rectSize / (steps - 1);


  push();
  translate(rectSize / 2, rectSize / 2);
  fill(212, 83, 72);
  rect(pos.x, pos.y, rectSize, rectSize);
  stroke(0, 0, 100);
  let lineStart = createVector(pos.x, y_);
  let lineEnd = createVector(pos.x + rectSize, y_);
  for (let i = -10; i < steps - 1 + 10; i++) {

    if (useNoise) {
      let lineVariY = (noise(xoff) - 0.5) * 110;
      lineStart.y = constrain(pos.y + (i * lineSpace) + lineVariY, pos.y, pos.y + rectSize);
      xoff += noise(xincrement);
      lineVariY = (noise(xoff) - 0.5) * 110;
      lineEnd.y = constrain(pos.y + (i * lineSpace) + lineVariY, pos.y, pos.y + rectSize);
      xoff += noise(xincrement);

      strokeWeight(sWeight);

      line(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y);
    } else {
      let lineVariY = (noise(xoff) - 0.5) * 110;
      lineStart.y = constrain(lineStart.y + (lineSpace), pos.y, pos.y + rectSize - 2);

      lineEnd.y = constrain(lineEnd.y + (lineSpace), pos.y, pos.y + rectSize - 2);

      strokeWeight(i * 0.8);
      line(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y);

    }

  }

  pop();
}
