import {RouterModule, Routes} from '@angular/router';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {NgModule} from '@angular/core';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';

const appRouter: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent,
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent},
      {path: ':id/delete', component: RecipeEditComponent},
    ]
  },
  {path: 'shopping-list', component: ShoppingListComponent,
    children: [
      {path: ':id/edit', component: ShoppingEditComponent}
    ]}
];

@NgModule( {
  imports: [RouterModule.forRoot(appRouter)],
  exports: [RouterModule]
  })
export class AppRoutingModule {

}


