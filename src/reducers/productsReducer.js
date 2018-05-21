import initialState from './initialState';
import * as actions from '../common/constants';

const productsReducer = (state = initialState.products, action) => {
	switch (action.type) {
		case actions.PRODUCT_ADD_SUCCESS:
			return state;
		default:
			return state;
	}
}

export default productsReducer;