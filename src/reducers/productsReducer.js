import initialState from './initialState';
import * as actions from '../common/constants';

const productsReducer = (state = initialState.products, action) => {
	switch (action.type) {
		case actions.PRODUCT_GET_ALL_SUCCESS:
			return action.payload;
		default:
			return state;
	}
}

export default productsReducer;