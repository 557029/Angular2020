import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeDetails = Recipe;
  constructor() { }

  ngOnInit() {
  }
  onSelect(recipe: Recipe): Recipe {
    console.log(recipe);
    return recipe;
  }
}
