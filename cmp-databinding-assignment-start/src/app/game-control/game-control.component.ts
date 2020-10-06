import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Input() eventNum: number;

  constructor() { }

  ngOnInit(): void {
  }

  onClickStartGame() {
    console.log('Clicked onClickStartGame');
  }
}
