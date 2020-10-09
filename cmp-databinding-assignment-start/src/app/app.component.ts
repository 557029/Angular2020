import {Component, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  oddNums: number[] = [];
  evenNums: number[] = [];
  constructor() {
  }
  onFireEvent(fireNum: number) {
    if (fireNum % 2 === 0) {
      this.oddNums.push(fireNum);
      console.log('Odd length:' + this.oddNums.length);
    } else {
      this.evenNums.push(fireNum);
      console.log('Evens length:' + this.evenNums.length);
    }
  }
}
