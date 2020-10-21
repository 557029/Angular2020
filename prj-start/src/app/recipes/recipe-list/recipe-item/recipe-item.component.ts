import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../recipe.service';
import {Recipe} from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSelect() {
    return this.recipeService.getRecipeSelected();
  }

}
