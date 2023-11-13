"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = exports.Cell = exports.Color = void 0;
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["GREEN"] = 1] = "GREEN";
    Color[Color["BLUE"] = 2] = "BLUE";
})(Color || (exports.Color = Color = {}));
class Cell {
    constructor(cell) {
        this.red = false;
        this.green = false;
        this.blue = false;
        if (cell) {
            this.red = cell.red;
            this.green = cell.green;
            this.blue = cell.blue;
        }
    }
    static createCellFromString(initialState) {
        let outputCell = new Cell();
        switch (initialState) {
            case 'R':
                outputCell.red = true;
                break;
            case 'G':
                outputCell.green = true;
                break;
            case 'B':
                outputCell.blue = true;
                break;
            case 'C':
                outputCell.green = true;
                outputCell.blue = true;
                break;
            case 'M':
                outputCell.red = true;
                outputCell.blue = true;
                break;
            case 'Y':
                outputCell.red = true;
                outputCell.green = true;
                break;
            case 'W':
                //console.log('Hit White');
                outputCell.red = true;
                outputCell.green = true;
                outputCell.blue = true;
                break;
            default:
                //console.log('womp womp');
                outputCell.red = false;
                outputCell.green = false;
                outputCell.blue = false;
                break;
        }
        return outputCell;
    }
    contentForConsole() {
        /*let end = '\x1b[0m';
        let red = '\x1b[31m';
        let green = '\x1b[32m';
        let blue = '\x1b[34m';
        let magenta = '\x1b[35m';
        let cyan = '\x1b[36m';
        let yellow = '\x1b[33m';
        let white = '\x1b[37m'; */
        let output = ``;
        if (this.red)
            output = `R`;
        if (this.green)
            output = `G`;
        if (this.blue)
            output = `B`;
        if (this.red && this.green)
            output = `Y`;
        if (this.green && this.blue)
            output = `C`;
        if (this.red && this.blue)
            output = `M`;
        if (this.red && this.green && this.blue)
            output = `W`;
        return output;
    }
    addColor(color) {
        let out = new Cell(this);
        if (color == Color.RED)
            out.red = !this.red;
        if (color == Color.GREEN)
            out.green = !this.green;
        if (color == Color.BLUE)
            out.blue = !this.blue;
        return out;
    }
    addWhite() {
        let out = new Cell(this);
        out = out.addColor(Color.RED);
        out = out.addColor(Color.GREEN);
        out = out.addColor(Color.BLUE);
        return out;
    }
    reset(color) {
        let out = new Cell(this);
        if (color == Color.RED)
            out.red = false;
        if (color == Color.GREEN)
            out.green = false;
        if (color == Color.BLUE)
            out.blue = false;
        return out;
    }
}
exports.Cell = Cell;
class Board {
    constructor(elementDictionary, height, width) {
        //size: number;
        this.elementDictionary = {};
        this.height = height;
        this.width = width;
        this.elementDictionary = elementDictionary;
        this.cellMatrix = new Array(height);
        //this.size = initialState.length;
        for (let y = 0; y < this.height; y++) {
            this.cellMatrix[y] = new Array(width);
            for (let x = 0; x < this.width; x++) {
                //console.log(initialState[y][x]);
                let coordString = x.toString() + ',' + y.toString();
                this.cellMatrix[y][x] = Cell.createCellFromString(this.elementDictionary[coordString].innerText);
                //console.log(this.cellMatrix[y][x].contentForConsole());
            }
        }
    }
    print() {
        let y = 0;
        for (var row of this.cellMatrix) {
            let rowString = '';
            let x = 0;
            for (var cell of row) {
                let coordString = x.toString() + ',' + y.toString();
                let content = cell.contentForConsole();
                let element = this.elementDictionary[coordString];
                element.innerText = content;
                element.className = 'grid-item-' + content;
                rowString += cell.contentForConsole();
            }
            console.log("a");
            console.log(rowString);
        }
        console.log('b');
        console.log('');
    }
    static mod(x, mod) {
        return (mod + x) % mod;
    }
    getNeighbors(x, y) {
        let neighbors = new Array();
        let xUp = Board.mod(x + 1, this.width);
        let xDo = Board.mod(x - 1, this.width);
        let yUp = Board.mod(y + 1, this.height);
        let yDo = Board.mod(y - 1, this.height);
        neighbors.push(this.getCell(xDo, yDo));
        neighbors.push(this.getCell(x, yDo));
        neighbors.push(this.getCell(xUp, yDo));
        neighbors.push(this.getCell(xDo, y));
        neighbors.push(this.getCell(xUp, y));
        neighbors.push(this.getCell(xDo, yUp));
        neighbors.push(this.getCell(x, yUp));
        neighbors.push(this.getCell(xUp, yUp));
        return neighbors;
    }
    getColorCount(neighbors, color) {
        //let neighbors = this.getNeighbors(x, y);
        let count = 0;
        //console.log(neighbors.length);
        for (let cell of neighbors) {
            if (color == Color.RED && cell.red)
                count++;
            if (color == Color.BLUE && cell.blue)
                count++;
            if (color == Color.GREEN && cell.green)
                count++;
        }
        //console.log(count);
        return count;
    }
    getCell(x, y) {
        return this.cellMatrix[y][x];
    }
    modifyCellByColor(current, hasColor, neighbors, color) {
        let n = this.getColorCount(neighbors, color);
        let outputCell = new Cell(current);
        if (hasColor) {
            if (n < 2) {
                outputCell = outputCell.addWhite();
            }
            if (n > 3) {
                //console.log('reset');
                outputCell = outputCell.reset(color);
            }
        }
        else {
            if (n == 3) {
                outputCell = outputCell.addColor(color);
            }
        }
        return outputCell;
    }
    modifyCell(cell, neighbors) {
        let outputCell = new Cell(cell);
        outputCell = this.modifyCellByColor(outputCell, cell.red, neighbors, Color.RED);
        outputCell = this.modifyCellByColor(outputCell, cell.green, neighbors, Color.GREEN);
        outputCell = this.modifyCellByColor(outputCell, cell.blue, neighbors, Color.BLUE);
        return outputCell;
    }
    nextStep() {
        let newMatrix = new Array();
        let y = 0;
        for (let row of this.cellMatrix) {
            newMatrix.push(new Array());
            let x = 0;
            for (let cell of row) {
                newMatrix[y].push(this.modifyCell(this.getCell(x, y), this.getNeighbors(x, y)));
                x++;
            }
            y++;
        }
        this.cellMatrix = newMatrix;
    }
}
exports.Board = Board;
//let cell = new Cell(); 
const container = document.getElementById("container");
const button = document.getElementById("go");
let dict = {};
function makeRows(rows, cols) {
    if (!container)
        return;
    container.style.setProperty('--grid-rows', rows.toString());
    container.style.setProperty('--grid-cols', cols.toString());
    for (let c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        container.appendChild(cell).className = "grid-item";
        cell.addEventListener('click', turnWhite);
        let xPos = c % 16;
        let yPos = 9 - Math.floor(c / 16);
        let cord = (xPos) + ',' + (yPos);
        //cell.innerText = cord;
        cell.innerText = '';
        console.log(cord);
        dict[cord] = cell;
    }
    ;
}
;
function turnWhite() {
    console.log('woot');
    console.log(dict['0,2']);
    this.className = 'grid-item-W';
    this.innerText = 'W';
}
makeRows(10, 16);
var board = new Board(dict, 10, 16);
const ITERATIONS = 5;
let i = 0;
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
function next() {
    board.nextStep();
    //console.clear();
    board.print();
    sleep(500).then(() => { i++; if (i < ITERATIONS)
        next(); });
}
if (button)
    button.addEventListener('click', next);
