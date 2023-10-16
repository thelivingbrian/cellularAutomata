"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("./Cell");
class Board {
    constructor(initialState) {
        this.cellMatrix = new Array();
        this.size = initialState.length;
        for (let y = 0; y < this.size; y++) {
            this.cellMatrix.push(new Array());
            for (let x = 0; x < this.size; x++) {
                //console.log(initialState[y][x]);
                this.cellMatrix[y].push(Cell_1.Cell.createCellFromString(initialState[y][x]));
                //console.log(this.cellMatrix[y][x].contentForConsole());
            }
        }
    }
    print() {
        for (var row of this.cellMatrix) {
            let rowString = '';
            for (var cell of row) {
                rowString += cell.contentForConsole();
            }
            console.log(rowString);
        }
        console.log('');
    }
    static mod(x, mod) {
        return (mod + x) % mod;
    }
    getNeighbors(x, y) {
        let neighbors = new Array();
        let xUp = Board.mod(x + 1, this.size);
        let xDo = Board.mod(x - 1, this.size);
        let yUp = Board.mod(y + 1, this.size);
        let yDo = Board.mod(y - 1, this.size);
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
            if (color == Cell_1.Color.RED && cell.red)
                count++;
            if (color == Cell_1.Color.BLUE && cell.blue)
                count++;
            if (color == Cell_1.Color.GREEN && cell.green)
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
        let outputCell = new Cell_1.Cell(current);
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
        let outputCell = new Cell_1.Cell(cell);
        outputCell = this.modifyCellByColor(outputCell, cell.red, neighbors, Cell_1.Color.RED);
        outputCell = this.modifyCellByColor(outputCell, cell.green, neighbors, Cell_1.Color.GREEN);
        outputCell = this.modifyCellByColor(outputCell, cell.blue, neighbors, Cell_1.Color.BLUE);
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
