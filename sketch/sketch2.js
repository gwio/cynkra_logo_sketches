let width = window.innerWidth;
let height = window.innerHeight;
let incre = width / 9;
let img;
let xoff = 0.0;
let xincrement = 0.015;
let steps = 5;


let sat = 17;
let bright = 6;
let mainColor = 196;
let cnykraRnd = 53;
let accentColor = false;
let accentHue = 189;
let noiseSeedVal = 123456;
let gradient = 15;
let spacing = 0.8;

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

function onSat(value_) {
  sat = value_;
  redraw();
}

function onBright(value_) {
  bright = value_;
  redraw();
}

function onColor(value_) {
  mainColor = value_;
  redraw();
}

function onCynkra(value_) {
  cnykraRnd = value_;
  redraw();
}

function onAccent(value_) {
  accentColor = value_;
  redraw();
}

function onAccentColor(value_) {
  accentHue = value_;
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

function onSpacing(value_) {
  spacing = value_;
  redraw();
}

//--------------------------------------

function setup() {
  createCanvas(width, height);
  var gui = QuickSettings.create(width - 300, 0, 'gui');

  gui.addRange('Tiles', 3, 50, 9, 1, onTiles);
  gui.addRange('GridSteps', 2, 10, 5, 1, onSteps);
  gui.addRange('Spacing', 0.5, 1.1, 0.84, 0.01, onSpacing);
  gui.addHTML('Color Variation', "");
  gui.addRange('Color', 1, 360, 196, 1, onColor);
  gui.addRange('Gradient', 1, 200, 15, 1, onGradient);
  gui.addRange('SaturationFac', 0, 100, 17, 1, onSat);
  gui.addRange('BrigthnessFac', 0, 100, 6, 1, onBright);
  gui.addHTML('cynkra Block', "");
  gui.addRange('random %', 0, 100, 53, 1, onCynkra);
  gui.addBoolean('Accent', false, onAccent);
  gui.addRange('AccentColor',0, 360, 189, 1, onAccentColor);
  gui.addNumber('NoiseSeed', 0, 999999, 123456, 1, onSeed);
  gui.addRange('NoiseSteps', 0.001, 0.02, 0.015, 0.001, onNoiseSteps);

  background(255);
  colorMode(HSB, 360, 100, 100);
ellipseMode(CORNER);
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
  let rectSize = (incre / steps) * scale_;

  push();
  translate(rectSize / 2, rectSize / 2);
  for (let i = 0; i < steps - 1; i++) {
    for (let j = 0; j < steps - 1; j++) {

      let nColor = (noise(xoff) - 0.5);
      print(nColor);
      let rnd = random(100);
      if (rnd > 98 && accentColor) {

        fill(accentHue + (nColor), constrain(((nColor + 0.5) * sat), 25, 100), 100 - constrain(((nColor + 0.5) * bright), 20, 100));
        xoff += xincrement;
        ellipse(pos.x + (i * rectSize), pos.y + (j * rectSize), rectSize * spacing, rectSize * spacing);
        //print(random);
      } else if (rnd > cnykraRnd) {
        fill(mainColor + (nColor * gradient), ((nColor + 0.5) * (sat*2)) , 100- ((nColor + 0.5) * (bright*2)) );
        ellipse(pos.x + (i * rectSize), pos.y + (j * rectSize), rectSize * spacing, rectSize * spacing);
        xoff += xincrement;
      } else {
        fill(212, 83, 72);
        rect(pos.x + (i * rectSize), pos.y + (j * rectSize), rectSize * spacing, rectSize * spacing);
      }

    }

  }
  pop();
}
