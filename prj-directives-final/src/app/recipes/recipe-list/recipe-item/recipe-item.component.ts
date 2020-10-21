import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../../recipe.model';
import {RecipesService} from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  // @Output() recipeSelected = new EventEmitter<void>();

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    // this.recipe = this.recipesService.selectedRecipe;
  }

  onSelected() {
    this.recipesService.selectedRecipe.emit(this.recipe);
    // this.recipeSelected.emit();
  }

}
