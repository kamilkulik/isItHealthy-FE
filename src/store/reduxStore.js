import { createStore, combineReducers, compose } from 'redux';
import permissionsReducer from '../reducers/permissions';
import photoReducer from '../reducers/photo';

export default () => {
  const store = createStore(
    combineReducers({ 
      permissions: permissionsReducer,
      photo: photoReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose,
    );
  return store;
};