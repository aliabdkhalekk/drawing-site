const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let strokeColor = '#000000'; // Default stroke color

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if (e.target.id === 'stroke') {
        strokeColor = e.target.value; // Update stroke color when the color input changes
    }

    if (e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

const draw = (e) => {
    if (!isPainting) {
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    ctx.strokeStyle = strokeColor; // Set the current stroke color
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Move the starting point to the current cursor position
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);

    // Add an extra "mousemove" event to handle continuous drawing
    canvas.addEventListener('mousemove', draw);
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();

    // Remove the "mousemove" event to stop drawing after releasing the mouse button
    canvas.removeEventListener('mousemove', draw);
});
