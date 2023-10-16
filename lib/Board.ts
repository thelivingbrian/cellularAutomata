import { Cell, Color } from './Cell';

export class Board {
    cellMatrix: Array<Array<Cell>> = new Array<Array<Cell>>();
    size: number;  
    
    constructor(initialState: string[][]) {
        this.size = initialState.length;
        for (let y = 0; y<this.size; y++){
            this.cellMatrix.push(new Array<Cell>());
            for (let x = 0; x<this.size; x++){
                //console.log(initialState[y][x]);
                this.cellMatrix[y].push(Cell.createCellFromString(initialState[y][x]));
                //console.log(this.cellMatrix[y][x].contentForConsole());
            }
        }
    }
    
    public print() {
        for ( var row of this.cellMatrix) {
            let rowString = '';
            for ( var cell of row ) {
                rowString += cell.contentForConsole();
            }
            console.log(rowString);
        }
        console.log('');
    }
    
    public static mod(x: number, mod: number){
        return (mod + x) % mod; 
    }
    
    public getNeighbors(x: number, y: number): Array<Cell>{
        let neighbors = new Array<Cell>();
        
        let xUp = Board.mod(x+1, this.size);
        let xDo = Board.mod(x-1, this.size);
        let yUp = Board.mod(y+1, this.size);
        let yDo = Board.mod(y-1, this.size);
        
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
    
    public getColorCount(neighbors:  Array<Cell>, color: Color): number{
        //let neighbors = this.getNeighbors(x, y);
        let count = 0;
        //console.log(neighbors.length);
        for (let cell of neighbors){
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
    
    public modifyCellByColor(current: Cell, hasColor: boolean, neighbors: Array<Cell>, color: Color): Cell{
        let n = this.getColorCount(neighbors, color)
        let outputCell: Cell = new Cell(current);
        if(hasColor){
            if (n < 2 ){
                outputCell = outputCell.addWhite();
            }
            if (n > 3){
                //console.log('reset');
                outputCell = outputCell.reset(color);
            }
        }
        else {
            if (n == 3){
                outputCell = outputCell.addColor(color)
            }
        }
        return outputCell;
    }
    
    public modifyCell(cell: Cell, neighbors: Array<Cell>): Cell{
        let outputCell = new Cell(cell);
        outputCell = this.modifyCellByColor(outputCell, cell.red, neighbors, Color.RED);
        outputCell = this.modifyCellByColor(outputCell, cell.green, neighbors, Color.GREEN);
        outputCell = this.modifyCellByColor(outputCell, cell.blue, neighbors, Color.BLUE);
        return outputCell;
    }
    
    public nextStep() {
        let newMatrix = new Array<Array<Cell>>();
        let y = 0;
        for (let row of this.cellMatrix) {
            newMatrix.push(new Array<Cell>());
            let x = 0;
            for (let cell of row ) {
                newMatrix[y].push(this.modifyCell(this.getCell(x,y), this.getNeighbors(x,y)));
                x++;
            }
            y++;
        }
        this.cellMatrix = newMatrix;
    }
}