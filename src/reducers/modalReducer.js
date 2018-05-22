import initialState from './initialState';
import * as actions from '../common/constants';

const serverErrorsReducer = (state = initialState.modals, action) => {
	switch (action.type) {
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
		default:
			return state;
	}
}

export default serverErrorsReducer;