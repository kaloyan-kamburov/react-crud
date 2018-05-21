import { combineReducers } from 'redux';

import productsReducer from './productsReducer';
import permissionsReducer from './permissionsReducer';

export default combineReducers({
	products: productsReducer,
	permissions: permissionsReducer
})