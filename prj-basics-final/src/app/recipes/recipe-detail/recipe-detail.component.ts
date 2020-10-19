import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeDetails = Recipe;
  @Output() menuSelected = new EventEmitter<boolean>();
  constructor() {
 }

  ngOnInit() {
  }
  onSelect(recipe: Recipe): Recipe {
    return recipe;
  }
}
