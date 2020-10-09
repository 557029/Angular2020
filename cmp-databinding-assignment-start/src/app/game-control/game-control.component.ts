import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() eventInterval = new EventEmitter<number>();
  public intervalNum: number;
  public currentNum: number;

  constructor() {
  }

  ngOnInit(): void {
    this.currentNum = 0;
  }

  onClickStartGame() {
    console.log('Clicked onClickStartGame');
    this.intervalNum = setInterval(() => {
      this.eventInterval.emit(this.currentNum + 1);
      this.currentNum++;
    }, 1000);
  }

  onStopGame() {
    clearInterval(this.intervalNum);
  }
}
