import { Cell, Color } from './Cell';

export class Board {
    cellMatrix: Array<Array<Cell>>;
    //size: number;
    elementDictionary: Record<string, any> = { };
    height: number;
    width: number;
    
    constructor( elementDictionary: Record<string, any>, height: number, width: number ) {
        this.height = height;
        this.width = width;
        this.elementDictionary = elementDictionary;
        this.cellMatrix = new Array<Array<Cell>>(height);
        //this.size = initialState.length;
        for (let y = 0; y<this.height; y++){
            this.cellMatrix[y] = new Array<Cell>(width);
            for (let x = 0; x<this.width; x++){
                //console.log(initialState[y][x]);
                let coordString = x.toString() + ',' + y.toString();
                this.cellMatrix[y][x] = Cell.createCellFromString(this.elementDictionary[coordString].innerText);
                //console.log(this.cellMatrix[y][x].contentForConsole());
            }
        }
    }
    
    public print() {
        let y = 0;
        for ( var row of this.cellMatrix) {
            let rowString = '';
            let x = 0
            for ( var cell of row ) {
                let coordString = x.toString() + ',' + y.toString();
                let content = cell.contentForConsole();
                let element = this.elementDictionary[coordString];
                element.innerText = content;
                element.className = 'grid-item-' + content; 

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
        
        let xUp = Board.mod(x+1, this.width);
        let xDo = Board.mod(x-1, this.width);
        let yUp = Board.mod(y+1, this.height);
        let yDo = Board.mod(y-1, this.height);
        
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