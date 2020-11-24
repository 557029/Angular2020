import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: null;
  editedIngredientIndex: -1;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};
export function shoppingListReducer(state: State = initialState,
                                    action: ShoppingListAction.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListAction.UPDATE_INGREDIENT:
      // the ingredient and ingredients array are unmutable and we have to copy
      // these variables if we need to do any data manipulations.
      // ...ingredient - copy of ingredient variable
      //
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListAction.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListAction.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload] }
      };
    case ShoppingListAction.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }

}
