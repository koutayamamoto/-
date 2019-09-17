'use strict';

var font;

var textTyped = '猛暑\n炸裂';
var drawMode = 1;
var fontSize = 300;
var padding = 10;
var nOff = 0;
var pointDensity = 8;

var colors;

var paths;
var textImg;

function preload() {
  font = loadFont('data/HiraMinProN-W6-AlphaNum-04.otf');
}

function setup() {
  createCanvas(600, 800);
  frameRate(50);
  rectMode(CENTER);

  colors = [color(200, 0, 0), color(255, 0, 15), color(0, 250, 250)];
  pixelDensity(1);

  setupText();
}

function setupText() {
  // create an offscreen graphics object to draw the text into
  textImg = createGraphics(width, height);
  textImg.pixelDensity(1);
  textImg.background(255);
  textImg.textFont(font);
  textImg.textSize(fontSize);
  textImg.text(textTyped, 0, fontSize + 50);
  textImg.loadPixels();
}

function draw() {
  background(255, 30);

  nOff++;

  for (var x = 0; x < textImg.width; x += pointDensity) {
    for (var y = 0; y < textImg.height; y += pointDensity) {
      // Calculate the index for the pixels array from x and y
      var index = (x + y * textImg.width) * 4;
      // Get the red value from image
      var r = textImg.pixels[index];

      if (r < 128) {



          if (drawMode == 1){
            stroke(0, 0, 0);
            strokeWeight(1);
            noStroke();

            var num = random(1);

            if (num < 0.6) {
              fill(colors[0]);
            } else if (num < 0.7) {
              fill(colors[1]);
            } else {
              fill(colors[2]);
            }

            push();
            beginShape();
            for (var i = 0; i < 3; i++){
              var ox = (noise((i * 1000 + x - nOff) / 100, (i * 3000 + y + nOff) / 30) - 0.5) * pointDensity * 6;
              var oy = (noise((i * 2000 + x - nOff) / 30, (i * 4000 + y + nOff) / 30) - 0.5) * pointDensity * 10;
              vertex(x + ox, y + oy);
            }
            endShape(CLOSE);
            pop();
          }



      }
    }
  }

}

function keyPressed() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode === DELETE || keyCode === BACKSPACE) {
    textTyped = textTyped.substring(0,max(0,textTyped.length - 1));
    setupText();
  }
  if (keyCode === ENTER || keyCode === RETURN) {
    textTyped += '\n';
    setupText();
  }

  if (keyCode === DOWN_ARROW) {
    pointDensity--;
    if (pointDensity < 4) pointDensity = 4;
  }
  if (keyCode === UP_ARROW) {
    pointDensity++;
  }

}

function keyTyped() {
  if (keyCode >= 32){
    textTyped += key;
    setupText();
  }
}
