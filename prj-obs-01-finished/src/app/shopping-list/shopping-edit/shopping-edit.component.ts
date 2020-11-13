import {
  Component,
  OnInit,
  ElementRef,
  ViewChild, OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editetItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editetItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editetItem.name,
          amount: this.editetItem.amount
        });
    });
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slForm.onReset();
    this.slService.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
    this.editedItemIndex = -1;
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
