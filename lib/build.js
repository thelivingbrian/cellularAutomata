"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = require("./Board");
let ITERATIONS = 50;
var x = [
    ['W', '', '', '', 'Y', ''],
    ['', '', 'W', '', 'M', ''],
    ['', '', 'W', '', 'C', ''],
    ['', '', 'W', '', 'G', ''],
    ['', '', '', '', 'R', ''],
    ['', 'B', '', '', '', ''],
];
var y = [
    ['C', 'C', 'C', 'C', 'C', 'C'],
    ['C', 'C', 'C', 'C', 'C', 'C'],
    ['C', 'C', 'R', 'C', 'C', 'C'],
    ['C', 'C', 'C', 'R', 'C', 'C'],
    ['C', 'R', 'R', 'R', 'C', 'C'],
    ['C', 'C', 'C', 'C', 'C', 'C'],
];
let board = new Board_1.Board(y);
board.print();
for (var i = 0; i < ITERATIONS; i++) {
    board.nextStep();
    board.print();
}
