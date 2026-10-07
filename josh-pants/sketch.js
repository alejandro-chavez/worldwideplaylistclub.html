let pieces = [];      // each piece: { img, x, y, w, h, angle }
let dragged = null;   // the piece currently being dragged
let selected = null;  // the piece R/E will rotate
let offsetX, offsetY;
let pantsImg;

async function setup() {
  createCanvas(800, 1200);

  const files = [
    { file: 'purple-linen-sm.jpeg',   x: 50,  y: 100, w: 60,  h: 60  },
    { file: 'plaid-sm.jpeg',          x: 200, y: 100, w: 60,  h: 60  },
    { file: 'light-chambray-sm.jpeg', x: 330, y: 100, w: 60,  h: 60  },
    { file: 'dark-chambray-sm.jpeg',  x: 450, y: 100, w: 60,  h: 60  },
    { file: 'daisys-small-sm.jpeg',   x: 50,  y: 280, w: 60,  h: 60  },
    { file: 'blue-waxed-sm.jpeg',     x: 200, y: 280, w: 108, h: 108 },
    {file: 'large-flower-square.jpeg', x:200, y: 320, w:120, h:120},
    {file: 'large-dark-chambray.jpeg', x:320, y: 320, w:156, h:108},
    {file: 'large-flowers.jpeg', x:400, y: 320, w:144, h:144}
  ];

  pantsImg = await loadImage('pants.JPG');

  const imgs = await Promise.all(files.map(f => loadImage(f.file)));

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    pieces.push({ img: imgs[i], x: f.x, y: f.y, w: f.w, h: f.h, angle: 0 });
  }
}

function draw() {
  if (dragged) {
    dragged.x = mouseX + offsetX;
    dragged.y = mouseY + offsetY;
  }

  drawScene();   // pants + pieces

  // instructions (only drawn on screen, not in the saved image)
  textSize(30);
  fill('yellow');
  stroke(0);
  strokeWeight(4);
  text('press e to rotate counter-clockwise,', 26, 30);
  text('press r for clockwise', 26, 60);
  text('press s to save/download your image', 26, 90);
}

function drawScene() {
  background(255);
  image(pantsImg, 0, 0, 800, 1200);

  for (const p of pieces) {
    push();
    translate(p.x + p.w / 2, p.y + p.h / 2);
    rotate(p.angle);
    imageMode(CENTER);
    image(p.img, 0, 0, p.w, p.h);
    pop();
  }
}
// Is the mouse over this piece, taking its rotation into account?
function isOver(p) {
  const dx = mouseX - (p.x + p.w / 2);
  const dy = mouseY - (p.y + p.h / 2);
  // rotate the mouse position backwards by the piece's angle
  const localX = dx * cos(-p.angle) - dy * sin(-p.angle);
  const localY = dx * sin(-p.angle) + dy * cos(-p.angle);
  return abs(localX) < p.w / 2 && abs(localY) < p.h / 2;
}

function mousePressed() {
  // Check from the top piece down so you grab what's visibly on top
  for (let i = pieces.length - 1; i >= 0; i--) {
    const p = pieces[i];
    if (isOver(p)) {
      dragged = p;
      selected = p;
      offsetX = p.x - mouseX;
      offsetY = p.y - mouseY;
      pieces.splice(i, 1);  // move it to the end of the array
      pieces.push(p);       // so it draws on top
      break;
    }
  }
}

function mouseReleased() {
  dragged = null;
}

function mouseWheel(event) {
  // Rotate whichever piece is under the mouse
  for (let i = pieces.length - 1; i >= 0; i--) {
    if (isOver(pieces[i])) {
      pieces[i].angle += event.delta > 0 ? radians(15) : radians(-15);
      return false;  // stop the page from scrolling
    }
  }
}

function keyTyped() {
if (key === 's') {
  drawScene();          // repaint without the text
  save('image.png');
}
  if (selected && key === 'r') {
    selected.angle += radians(5);
  }
  if (selected && key === 'e') {
    selected.angle -= radians(5);
  }
}