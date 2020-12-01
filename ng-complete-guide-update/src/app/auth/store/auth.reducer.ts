import {User} from '../user.model';
import * as fromAuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}
const initialState = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(state = initialState, action: fromAuthActions.AuthActions) {
  switch (action.type) {
    case fromAuthActions.AUTHENTICATE_SUCCESS:
      const authUser = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: authUser,
        authError: null,
        loading: false
      };
    case fromAuthActions.LOGIN_START:
    case fromAuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case fromAuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        loading: false
      };
    case fromAuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    case fromAuthActions.CLEAR_ERRORS:
      return  {
        ...state,
        user: null,
        authError: null,
        loading: false
      };
    default:
      return state;
  }
}
