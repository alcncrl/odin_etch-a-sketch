'use strict';
// IIFE for creating grids upon loading of page
(function (col = 8, row = 8) {
  for (let i = 0; i < col; i++) {
    const sheet = document.querySelector('.sheet');
    const columns = document.createElement('div');
    columns.classList.add('columns');
    columns.classList.add('col-border');
    sheet.appendChild(columns);
    for (let x = 0; x < row; x++) {
      const getCol = document.querySelectorAll('.columns');
      const rows = document.createElement('div');
      rows.classList.add('rows');
      rows.classList.add('row-border');
      rows.classList.add('hover');
      getCol[i].appendChild(rows);
    }
  }
})();

// Variables
let onOff = false;
let cursorStatus = 1; // 1 - Custom Color, 2 - Rainbow, 3 - Eraser
let columns = document.querySelectorAll('.columns');
let rows = document.querySelectorAll('.rows');
const sheet = document.querySelector('.sheet');
const customclrBtn = document.getElementById('option1');
const rainbowBtn = document.getElementById('option2');
const eraseBtn = document.getElementById('option3');
const toggleGridBtn = document.getElementById('enablegrid');
const canvasClrBtn = document.getElementById('canvas-bgclr');
const resetBtn = document.querySelector('#resetBtn');
const sliderLabel = document.querySelector('.mySize');
const slider = document.getElementById('gridSize');
const rainbowColors = [
  '#9400D3',
  '#4B0082',
  '#0000FF',
  '#00FF00',
  '#FFFF00',
  '#FF7F00',
  '#FF0000',
];

// Reset Sheet
resetBtn.addEventListener('click', () => {
  rows.forEach((row) => {
    row.style.background = 'none';
  });
  toggleGridBtn.checked = true;
  rmvFillColor();
  selColorBtn();
  toggleGrids();
  customclrBtn.value = 'black';
  canvasClrBtn.value = '#f2f5f5';
  sheet.style.background = canvasClrBtn.value;
});

// Remove Grids
toggleGridBtn.addEventListener('click', toggleGrids);

// Single click for single fill
sheet.addEventListener('mousedown', (e) => fillColor(e));

// Double click to enable auto fill
sheet.addEventListener('dblclick', () => {
  onOff = !onOff;
  onOff ? addFillColor() : rmvFillColor();
});

// Custom Color Button
customclrBtn.addEventListener('click', selColorBtn);

// Custom Color Function
function customColor(e) {
  e.target.classList.add('fill');
  e.target.style.background = `${customclrBtn.value}`;
}

// Rainbow Button
rainbowBtn.addEventListener('click', () => (cursorStatus = 2));

// Rainbow Color Function
function rainbowColor(e) {
  let genColor = Math.trunc(Math.random() * 6);
  e.target.classList.add('fill');
  e.target.style.background = `${rainbowColors[genColor]}`;
}
// Eraser Button
eraseBtn.addEventListener('click', () => (cursorStatus = 3));

// Eraser Function
function eraserBtn(e) {
  e.target.style.background = '';
}

// Changes the background color of the canvas
canvasClrBtn.addEventListener(
  'change',
  () => (sheet.style.background = canvasClrBtn.value)
);

// Slider - Changes the size of the grid
slider.addEventListener('input', () => {
  let size = slider.value;
  sheet.innerHTML = '';
  gridSz(size, size);
  sliderLabel.innerHTML = `${size} by ${size}`;
});

// Add event FILL COLOR
const color = (e) => fillColor(e); // Event required to prompt removeEventListener

const addFillColor = function () {
  rows.forEach((row) => {
    row.addEventListener('mouseover', color);
  });
};
// Remove event FILL COLOR
const rmvFillColor = function () {
  rows.forEach((row) => {
    row.removeEventListener('mouseover', color);
  });
};

// Functions

// Changes the color of a row cell/s
function fillColor(e) {
  if (cursorStatus === 1) {
    customColor(e);
  } else if (cursorStatus === 2) {
    rainbowColor(e);
  } else if (cursorStatus === 3) {
    eraserBtn(e);
  }
}

// When color button was clicked
function selColorBtn() {
  cursorStatus = 1;
  rainbowBtn.checked = false;
  eraseBtn.checked = false;
}

// Toggle grids
function toggleGrids() {
  if (toggleGridBtn.checked) {
    rows.forEach((row) => row.classList.add('row-border'));
    columns.forEach((col) => col.classList.add('col-border'));
  } else {
    rows.forEach((row) => row.classList.remove('row-border'));
    columns.forEach((col) => col.classList.remove('col-border'));
  }
}

// Responsible for changing the size of sheet/working area
function gridSz(col = 16, row = 16) {
  for (let i = 0; i < col; i++) {
    const sheet = document.querySelector('.sheet');
    const columns = document.createElement('div');
    columns.classList.add('columns');
    columns.classList.add('col-border');
    sheet.appendChild(columns);
    for (let x = 0; x < row; x++) {
      const getCol = document.querySelectorAll('.columns');
      const rows = document.createElement('div');
      rows.classList.add('rows');
      rows.classList.add('row-border');
      getCol[i].appendChild(rows);
    }
  }
  columns = document.querySelectorAll('.columns');
  rows = document.querySelectorAll('.rows');
}
