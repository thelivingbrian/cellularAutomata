import { Component } from '@angular/core';
import { GridComponent } from './grid/grid.component'; // Update the path based on your project structure

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HelloWorld';
  constructor(private gridComponent: GridComponent) {}
  
  changeSquareColor(row: number, col: number, color: string): void {
    console.log('hi');
    this.gridComponent.updateSquareColor(row, col, color);
  }
}
