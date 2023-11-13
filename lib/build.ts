import { Board } from './Board';

let ITERATIONS = 500;

var x: string[][] = [
            [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
            [' ' ,'B' ,'B' ,' ' ,' ' ,' ' ],
            [' ' ,'B' ,'B','B' ,' ' ,' ' ],
            [' ' ,'' ,'B' ,'B',' ' ,' ' ],
            [' ' ,'','','',' ' ,' ' ],
            [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        ];
        
var y: string[][] = [
            [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
            [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
            [' ' ,' ' ,'W',' ' ,' ' ,' ' ],
            [' ' ,' ' ,' ' ,'W',' ' ,' ' ],
            [' ' ,'W','W','W',' ' ,' ' ],
            [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        ];
        
var z: string[][] = [
            ['W','','','','Y',''],
            ['','','W','','M',''],
            ['','','W','',' ',''],
            ['','','W','','G',''],
            ['','','','','W',''],
            ['','B','','','',''],
        ];
        
let auto: Array<Array<string>> = new Array<Array<string>>();

for(let i = 0; i<25; i++){
    auto.push(new Array<string>())
    for(let j = 0; j<25; j++){
        if (i>10 && j>10 && j<23 && i<23) {
            let rand = Math.floor(Math.random() * 10);
            if (rand == 1) auto[i].push('W');
            else if (rand == 2) auto[i].push('W');
            else if (rand == 3) auto[i].push('W');
            else if (rand == 4) auto[i].push('W');
            else if (rand == 5) auto[i].push('W');
            else if (rand == 6) auto[i].push('W');
            else if (rand == 7) auto[i].push('W');
            else auto[i].push('');
        }
        else {
            auto[i].push('');
        }
    }
}

const sleep = (waitTimeInMs: number) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

/*let board = new Board(auto);
board.print();
let i = 0 
function next() {
    board.nextStep();
    console.clear();
    board.print(); 
    sleep(500).then(() => {i++; if(i<ITERATIONS) next();})
}

next(); */
