import { Component, OnInit } from '@angular/core';
import { Cell, Color } from './Cell';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
    playGame: boolean = false;
    gridSize = 40;
    height = this.gridSize;
    width = this.gridSize;
    cellMatrix = Array.from({ length: this.gridSize }, () =>
        Array.from({ length: this.gridSize }, () => Cell.createCellFromString(''))
    );
    clickColor = 'B'

    constructor() { }

    ngOnInit(): void { }

    toggleSquare(row: number, col: number): void {
        this.cellMatrix[row][col] = Cell.createCellFromString('B');
    }

    updateSquareColor(row: number, col: number, color: string): void {
        // Add logic to update the color of the square at the specified coordinates
        // For example, you can use a property to store the color information
        console.log(`row: ${row} col: ${col}`);
        console.log(this.cellMatrix[row][col]);

        this.cellMatrix[row][col] = Cell.createCellFromString(this.clickColor);
        console.log(this.cellMatrix[row][col]);
    }

    setClick(color: string) {
        this.clickColor = color;
    }

    reset() {
        this.cellMatrix = Array.from({ length: this.gridSize }, () =>
            Array.from({ length: this.gridSize }, () => Cell.createCellFromString(''))
        );
    }

    public static mod(x: number, mod: number) {
        return (mod + x) % mod;
    }

    public getNeighbors(x: number, y: number): Array<Cell> {
        let neighbors = new Array<Cell>();

        let xUp = GridComponent.mod(x + 1, this.width);
        let xDo = GridComponent.mod(x - 1, this.width);
        let yUp = GridComponent.mod(y + 1, this.height);
        let yDo = GridComponent.mod(y - 1, this.height);

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

    public getColorCount(neighbors: Array<Cell>, color: Color): number {
        //let neighbors = this.getNeighbors(x, y);
        let count = 0;
        //console.log(neighbors.length);
        for (let cell of neighbors) {
            if (color == Color.RED && cell.red) count++;
            if (color == Color.BLUE && cell.blue) count++;
            if (color == Color.GREEN && cell.green) count++;
        }
        //console.log(count);
        return count;
    }

    public getCell(x: number, y: number): Cell {
        return this.cellMatrix[y][x];
    }

    public modifyCellByColor(current: Cell, hasColor: boolean, neighbors: Array<Cell>, color: Color, reporter: (arg: string) => void): Cell {
        let n = this.getColorCount(neighbors, color)
        let outputCell: Cell = new Cell(current);
        reporter(color.toString());
        reporter(hasColor.toString());
        if (hasColor) {
            if (n < 2) {
                outputCell = outputCell.addWhite(); // green
                reporter('adding White');
            }
            if (n > 3) {
                //console.log('reset');
                outputCell = outputCell.addColor(color); // red blue
                reporter('reseting color');
            }
        }
        else {
            if (n == 3) {
                outputCell = outputCell.addColor(color);
                reporter("adding color");
            }
        }
        return outputCell;
    }

    public modifyCell(cell: Cell, neighbors: Array<Cell>): Cell {
        let outputCell = new Cell(cell);
        let reporter = (arg: string) => { };
        if (cell.red && cell.green && cell.blue) reporter = console.log;
        outputCell = this.modifyCellByColor(outputCell, cell.red, neighbors, Color.RED, reporter);
        outputCell = this.modifyCellByColor(outputCell, cell.green, neighbors, Color.GREEN, reporter);
        outputCell = this.modifyCellByColor(outputCell, cell.blue, neighbors, Color.BLUE, reporter);
        return outputCell;
    }

    public sleep = (waitTimeInMs: number) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

    public play() {
        this.playGame = true;
        this.nextStep();
        this.sleep(50).then(() => {if(this.playGame) this.play()});
    }

    public stop() {
        this.playGame = false;
    }

    public nextStep() {
        let newMatrix = new Array<Array<Cell>>();
        let y = 0;
        for (let row of this.cellMatrix) {
            newMatrix.push(new Array<Cell>());
            let x = 0;
            for (let cell of row) {
                if (!cell.inert) newMatrix[y].push(this.modifyCell(this.getCell(x, y), this.getNeighbors(x, y)));
                if (cell.inert) newMatrix[y].push(Cell.createCellFromString('I'));
                x++;
            }
            y++;
        }
        this.cellMatrix = newMatrix;
    }
}
