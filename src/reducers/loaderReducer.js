import initialState from './initialState';
import * as actions from '../common/constants';

const loaderReducer = (state = initialState.loaders, action) => {
	switch (action.type) {
		case actions.PERMISSIONS_CHECK_REQUEST:
			return {
				...state,
				permissions: true
			}
		
		case actions.PERMISSIONS_CHECK_SUCCESS:
			return {
				...state,
				permissions: false
			}
			
		case actions.PRODUCT_ADD_REQUEST:
			return {
				...state,
				productAdd: true
			}
		
		case actions.PRODUCT_ADD_SUCCESS:
		case actions.PRODUCT_ADD_ERROR:
			return {
				...state,
				productAdd: false
			}

		case actions.PRODUCT_UPDATE_REQUEST:
			return {
				...state,
				productEdit: true
			}
		
		case actions.PRODUCT_UPDATE_SUCCESS:
		case actions.PRODUCT_UPDATE_ERROR:
			return {
				...state,
				productEdit: false
			}

		case actions.PRODUCT_DELETE_REQUEST:
			return {
				...state,
				productDelete: true
			}
		
		case actions.PRODUCT_DELETE_SUCCESS:
		case actions.PRODUCT_DELETE_ERROR:
			return {
				...state,
				productDelete: false
			}

		

		default:
			return state;
	}
}

export default loaderReducer;