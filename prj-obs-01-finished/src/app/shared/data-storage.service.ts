import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {pipe} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.post('https://ng-course-recipes-book-d6e5a.firebaseio.com/recipes.json',
      recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-course-recipes-book-d6e5a.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ngredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        })
      ).tap( recipes => {
        this.recipeService.setRecipes(recipes);
      });

    // this.http.get<{[key: string]: Recipe[]}>('https://ng-course-recipes-book-d6e5a.firebaseio.com/recipes.json')
    //   .subscribe( recipes => {
    //     for (const el in recipes) {
    //       if (recipes.hasOwnProperty(el)) {
    //         const recipeArr: Recipe[] = recipes[el];
    //         this.recipeService.setRecipes(recipeArr);
    //       }
    //     }
    //   });
  }
}
