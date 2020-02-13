import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { users, tabs } from './reducer'

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
};

const rootReducer = combineReducers({
  users,
  tabs,
});

const initialState = {
  tabs: { data: {
      tree: ['explorer1', 'json'],
      modal: ['children1', 'attributes'],
    }
  },
  users: null,
}

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    rootReducer,
    preloadedState,
    bindMiddleware([thunkMiddleware])
  )
};

export type IStore = ReturnType<typeof createStore>;