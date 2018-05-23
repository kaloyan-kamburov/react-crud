import initialState from './initialState';
import * as actions from '../common/constants';

const productsReducer = (state = initialState.products, action) => {
	let allProducts;
	switch (action.type) {
		case actions.PRODUCT_GET_ALL_SUCCESS:
			return {
				...state,
				all: action.payload
			}
			
		case actions.PRODUCT_ADD_SUCCESS:
			allProducts = state.all;
			allProducts.push(action.payload.product);
			return {
				...state,
				all: [
					...allProducts
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
			
		case actions.PRODUCT_SET_DELETE:
			let currentDeleteProduct = state.all[action.payload];
			return {
				...state,
				currentDeleteProduct: {
					...currentDeleteProduct,
					index: action.payload
				}
			}
		
		
		case actions.PRODUCT_UNSET_DELETE:
			return {
				...state,
				currentDeleteProduct: {}
			}
		
		case actions.PRODUCT_UPDATE_SUCCESS:
			allProducts = state.all;
			allProducts[action.payload.product.index] = {
				name: action.payload.product.name,
				price: action.payload.product.price,
				currency: action.payload.product.currency
			}
			return {
				...state,
				all: allProducts
			}

		case actions.PRODUCT_DELETE_SUCCESS:
			allProducts = state.all;
			allProducts.splice(action.payload.index, 1);
			return {
				...state,
				currentDeleteProduct: {},
				all: allProducts
			} 
			
		default:
			return state;
	}
}

export default productsReducer;