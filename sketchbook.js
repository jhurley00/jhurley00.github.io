// interactive_sketchpad.js
const canvas = document.getElementById('sketchpad');
const ctx = canvas.getContext('2d');

const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearCanvasButton = document.getElementById('clearCanvas');

let painting = false;

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;

  ctx.lineWidth = brushSize.value;
  ctx.lineCap = 'round';
  ctx.strokeStyle = colorPicker.value;

  const rect = canvas.getBoundingClientRect();
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

clearCanvasButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});