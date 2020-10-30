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
  // @Output() recipeSelected = new EventEmitter<void>();

  constructor(private recipesService: RecipesService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.recipe = this.recipesService.selectedRecipe;
  }

  onSelected() {
    this.route.data.subscribe((data: Data) => {
      const id = data['id'];
      this.recipe = this.recipesService.getRecipe(id);
    });
    // this.recipesService.selectedRecipe.emit(this.recipe);
    // this.recipeSelected.emit();
  }

}
