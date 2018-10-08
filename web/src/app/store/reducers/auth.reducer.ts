import { AuthActionTypes, All } from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
  token: any | null;
  user: any | null;
}

export const initState: State = {
  isAuthenticated: false,
  token: null,
  user: null
};

export function reducer(state = initState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.AUTH_LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };
    }

    case AuthActionTypes.AUTH_SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user
      };
    }

    case AuthActionTypes.AUTH_STATUS: {
      const storage = action.payload;

      return {
        ...state,
        isAuthenticated: (!!(storage && storage.token && storage.user) || false),
        token: ((storage && storage.token) || null),
        user: ((storage && storage.user) || null)
      };
    }

    default: {
      return state;
    }
  }
}
