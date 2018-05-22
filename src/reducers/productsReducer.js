import initialState from './initialState';
import * as actions from '../common/constants';

const productsReducer = (state = initialState.products, action) => {
	let newProducts;
	switch (action.type) {
		case actions.PRODUCT_GET_ALL_SUCCESS:
			return {
				...state,
				all: action.payload
			}
		case actions.PRODUCT_ADD_SUCCESS:
			newProducts = state.all;
			newProducts.push(action.payload.product);
			return {
				...state,
				all: [
					...newProducts
				]
			}
		case actions.PRODUCT_SET_EDIT:
			let currentEditableProduct = state.all[action.payload]
			return {
				...state,
				currentEditableProduct: {
					...currentEditableProduct,
					index: action.payload
				}
			}
		
		case actions.PRODUCT_UNSET_EDIT:
			return {
				...state,
				currentEditableProduct: {}
			}
		
		case actions.PRODUCT_UPDATE_SUCCESS:
			let allProducts = state.all;
			allProducts[action.payload.product.index] = {
				name: action.payload.product.name,
				price: action.payload.product.price,
				currency: action.payload.product.currency
			}
			return {
				...state,
				all: allProducts
			}

		case actions.PRODUCT_ADD_ERROR:
			return state;
		default:
			return state;
	}
}

export default productsReducer;