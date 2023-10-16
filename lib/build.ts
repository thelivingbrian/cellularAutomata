import { Board } from './Board';

let ITERATIONS = 50;

var x: string[][] = [
            ['W','','','','Y',''],
            ['','','W','','M',''],
            ['','','W','','C',''],
            ['','','W','','G',''],
            ['','','','','R',''],
            ['','B','','','',''],
        ];
        
var y: string[][] = [
            ['C' ,'C' ,'C' ,'C' ,'C' ,'C' ],
            ['C' ,'C' ,'C' ,'C' ,'C' ,'C' ],
            ['C' ,'C' ,'R','C' ,'C' ,'C' ],
            ['C' ,'C' ,'C' ,'R','C' ,'C' ],
            ['C' ,'R','R','R','C' ,'C' ],
            ['C' ,'C' ,'C' ,'C' ,'C' ,'C' ],
        ];


let board = new Board(y);
board.print();

for (var i = 0; i<ITERATIONS; i++){
    board.nextStep();
    board.print(); 
}
