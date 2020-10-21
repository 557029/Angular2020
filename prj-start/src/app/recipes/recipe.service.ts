import {Recipe} from './recipe.model';
import {EventEmitter} from '@angular/core';

export class RecipeService {
  private recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'A Test of Recipe',
      'https://c.pxhere.com/images/55/ea/731c6361ea0a0c55e6e78be8c970-1613434.jpg!d'),
    new Recipe('This is another recipe',
      'Another Recipe Description',
      'https://c.pxhere.com/images/55/ea/731c6361ea0a0c55e6e78be8c970-1613434.jpg!d')
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeSelected() {
    return this.recipeSelected;
  }
}
