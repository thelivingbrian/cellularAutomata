export enum Color {
    RED,
    GREEN,
    BLUE
}

export class Cell {
    red: boolean = false;
    green: boolean = false; 
    blue: boolean = false; 
    
    constructor(cell?: Cell) {
        if (cell) {
            this.red = cell.red;
            this.green = cell.green;
            this.blue = cell.blue;
        }
    }
    
    static createCellFromString(initialState: string): Cell{
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
    
    public contentForConsole(): string{
        let end = '\x1b[0m'; 
        let red = '\x1b[31m';
        let green = '\x1b[32m';
        let blue = '\x1b[34m';
        let magenta = '\x1b[35m';
        let cyan = '\x1b[36m';
        let yellow = '\x1b[33m';
        let white = '\x1b[37m';
        
        let output = `${white} - ${end}`;
        
        if (this.red) output = `${red} R ${end}`;
        if (this.green) output = `${green} G ${end}`;
        if (this.blue) output = `${blue} B ${end}`;
        if (this.red && this.green) output = `${yellow} Y ${end}`;
        if (this.green && this.blue) output = `${cyan} C ${end}`;
        if (this.red && this.blue) output = `${magenta} M ${end}`;
        if (this.red && this.green && this.blue) output = `${white} W ${end}`;
        return output;
    }
    
    public addColor(color: Color): Cell{
        let out = new Cell(this);  
        if ( color == Color.RED ) out.red = !this.red;
        if ( color == Color.GREEN ) out.green = !this.green;
        if ( color == Color.BLUE ) out.blue = !this.blue;
        return out;
    }
    
    public addWhite(): Cell{
        let out = new Cell(this);
        out = out.addColor(Color.RED);
        out = out.addColor(Color.GREEN);
        out = out.addColor(Color.BLUE);
        return out;
    }
    
    public reset(color: Color): Cell {
        let out = new Cell(this);
        if ( color == Color.RED ) out.red = false;
        if ( color == Color.GREEN ) out.green = false;
        if ( color == Color.BLUE ) out.blue = false;
        return out;
    }
}