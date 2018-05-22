import initialState from './initialState';
import * as actions from '../common/constants';

const resetMessages = () => {
	return {
		productExists: '',
		productUpdateError: '',
		productUpdateSuccess: ''
	}
}

const serverErrorsReducer = (state = initialState.serverMessages, action) => {
	let newProducts;
	switch (action.type) {
		case actions.PRODUCT_ADD_ERROR:
			return {
				...resetMessages(),
				productExists: action.payload.msg
			}
		case actions.PRODUCT_ADD_SUCCESS:
			return {
				...resetMessages(),
			}
		case actions.PRODUCT_UPDATE_SUCCESS:
			return {
				...resetMessages(),
				productUpdateSuccess: action.payload.msg
			}
		case actions.PRODUCT_UPDATE_ERROR:
			return {
				...resetMessages(),
				productUpdateError: action.payload.msg
			}
		case actions.PRODUCT_UNSET_EDIT:
			return {
				...resetMessages()
			}
		default:
			return {
				...resetMessages(),
			}
	}
}

export default serverErrorsReducer;