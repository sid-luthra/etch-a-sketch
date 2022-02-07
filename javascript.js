const container = document.querySelector("#eas-container");
const pixScaleLabel = document.querySelector("#pixscale");
let pixScale = 8;
let penOn = false;
let color = "black";

function createGrid(pixScale) {
    let pixSize = 480 / pixScale;
    grid = document.createElement("div");
    grid.setAttribute("id", "eas");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${pixScale},${pixSize}px)`;
    grid.style.gridTemplateRows = `repeat(${pixScale},${pixSize}px)`; 
    grid.style.justifyContent = "stretch";
    grid.style.alignItems = "stretch";
    grid.addEventListener('mousedown', () => {
        penOn = true;
    })
    grid.addEventListener('mouseup', () => {
        penOn = false;
    })
    grid.addEventListener('mouseleave', () => {
        penOn = false;
    })
    container.appendChild(grid);
}

function createPixels(pixScale) {
    let pixSize = 480 / pixScale;
    for (rows = 1; rows <= pixScale; rows++) {
        for (columns = 1; columns <= pixScale; columns++) {
            gridItem = document.createElement("div");
            gridItem.setAttribute('id', `griditem-${rows}-${columns}`);
            gridItem.classList.add('gridItem');
            gridItem.style.width = pixSize;
            gridItem.style.height = pixSize;
            gridItem.addEventListener('mouseenter', function (e) {
                if (penOn == true) {
                    e.target.style.background = color;
                }
            });
            gridItem.addEventListener('click', function (e) {
                e.target.style.background = color;
            })
            gridItem.addEventListener('dblclick', function (e) {
                e.target.style.background = "";
            });
            grid.appendChild(gridItem);
        }
    }
}

function deleteGrid() {
    container.removeChild(grid);
}

function refreshGrid() {
    deleteGrid();
    createGrid(pixScale);
    createPixels(pixScale);
    pixScaleLabel.textContent = pixScale;
}

const scaleUp = document.querySelector("#scale-up");
scaleUp.addEventListener('click',doubleScale);

function doubleScale() {
    if (pixScale < 64) {
        pixScale = pixScale * 2;
        refreshGrid();
    } else {
        alert("Max scale reached!")
    }
}

const scaleDown = document.querySelector("#scale-down");
scaleDown.addEventListener('click',halfScale);

function halfScale() {
    if (pixScale > 2) {
        pixScale = pixScale / 2;
        refreshGrid();
    } else {
        alert("Min scale reached!")
    }
}

const eraser = document.querySelector("#eraser");
eraser.addEventListener('click',eraseAll);

function eraseAll() {
    let gridItems = document.querySelectorAll(".gridItem");
    gridItems.forEach((item) => {
        item.style.backgroundColor = "";
    })
}

createGrid(pixScale);
createPixels(pixScale);