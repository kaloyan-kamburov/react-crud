import { combineReducers } from 'redux';

import productsReducer from './productsReducer';
import permissionsReducer from './permissionsReducer';
import serverMessagesReducer from './serverMessagesReducer';
import modalReducer from './modalReducer';


export default combineReducers({
	products: productsReducer,
	permissions: permissionsReducer,
	serverMessages: serverMessagesReducer,
	modals: modalReducer
})