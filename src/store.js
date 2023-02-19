import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

// state
const initialState = {
  authChecked: false,
  loggedIn: false,
  remember: false,
  token: null,
  user: {},
}
// une action qui prends selon le besoin un payload.
export const AUTHENTICATED = (remember, token) => ({
    type: 'AUTHENTICATED',
    payload: { remember, token },
})
// une action pour les data de l'user.
export const DATAUSER = (user, token) => ({
    type: "DATAUSER",
    payload: {user, token}
})


// le reducer, qui prends le state, et une action (qu'il ne connais pas a l'avance)
function reducer(state = initialState, action) {
    if (action.type === 'AUTHENTICATED') {
      return {
        ...state,
        authChecked: true,
        loggedIn: true,
        remember: action.payload.remember,
        token: action.payload.token,
      }
    }
    if(action.type === "DATAUSER"){
        return{
            ...state,
            authChecked: true,
            loggedIn: true,
            user: action.payload.user,
            token: action.payload.token
        }
    }
    return state
  }

export const store = createStore(reducer, composeWithDevTools())
