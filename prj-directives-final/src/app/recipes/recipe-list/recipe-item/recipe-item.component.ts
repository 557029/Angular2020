import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../../recipe.model';
import {RecipesService} from '../../recipes.service';
import {ActivatedRoute, Data, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  // @Output() recipeSelected = new EventEmitter<void>();
  ngOnInit() {
    // this.recipe = this.recipesService.selectedRecipe;
  }

}
