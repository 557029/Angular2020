import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from './shopping-list.service';
import {Store} from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListAction from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[];
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private subscription: Subscription;

  constructor(// rivate slService: ShoppingListService,
              private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListAction.StartEdit(index));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
