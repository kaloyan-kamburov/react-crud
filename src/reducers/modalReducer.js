import initialState from './initialState';
import * as actions from '../common/constants';

const serverErrorsReducer = (state = initialState.modals, action) => {
	switch (action.type) {
		case actions.PRODUCT_ADD_MODAL_SHOW:
			return {
				...state,
				add: true
			}
		
		case actions.PRODUCT_ADD_MODAL_HIDE:
		case actions.PRODUCT_ADD_SUCCESS:
			return {
				...state,
				add: false
			}

		case actions.PRODUCT_SET_EDIT:
			return {
				...state,
				edit: true
			}
			
		case actions.PRODUCT_UNSET_EDIT:
			return {
				...state,
				edit: false
			}

		case actions.PRODUCT_SET_DELETE:
			return {
				...state,
				delete: true
			}

		case actions.PRODUCT_UNSET_DELETE:
			return {
				...state,
				delete: false
			}

		case actions.PRODUCT_DELETE_SUCCESS:
			return {
				...state,
				delete: false
			}
		
		default:
			return state;
	}
}

export default serverErrorsReducer;