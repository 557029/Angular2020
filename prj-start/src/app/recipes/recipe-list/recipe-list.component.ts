import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'A Test of Recipe',
      'https://c.pxhere.com/images/55/ea/731c6361ea0a0c55e6e78be8c970-1613434.jpg!d')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
