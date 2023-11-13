import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  gridSize = 40;
  grid = Array.from({ length: this.gridSize }, () =>
    Array.from({ length: this.gridSize }, () => 'green')
  );

  constructor() {}

  ngOnInit(): void {}

  toggleSquare(row: number, col: number): void {
    this.grid[row][col] = '11ff11';
  }

  updateSquareColor(row: number, col: number, color: string): void {
    // Add logic to update the color of the square at the specified coordinates
    // For example, you can use a property to store the color information
    this.grid[row][col] = color;
  }
}
