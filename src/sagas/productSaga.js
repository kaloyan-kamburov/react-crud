import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../common/constants';
import * as constants from '../common/constants';

function* productGetAllSaga(action) {
	try {
		const products = yield call(() => 
			axios.get(constants.API_URL + 'products')
		);
        
		if (products.data) {
			yield put({ type: actions.PRODUCT_GET_ALL_SUCCESS, payload: products.data });
		} else {
			yield put({ type: actions.PRODUCT_GET_ALL_ERROR, payload: products });
		}

	} catch(error) {
		yield put({ type: actions.PRODUCT_GET_ALL_ERROR, payload: error });		
	}
}

function* productAddSaga(action) {
	try {
		const productAdd = yield call(() => 
			axios.post(constants.API_URL + 'addProduct', action.payload)
		);
        
		if (productAdd.data.success) {
			yield put({ type: actions.PRODUCT_ADD_SUCCESS, payload: productAdd.data });
		} else {
			yield put({ type: actions.PRODUCT_ADD_ERROR, payload: productAdd.data });
		}

	} catch(error) {
		yield put({ type: actions.PRODUCT_ADD_ERROR, payload: error });		
	}
}

function* productUpdateSaga(action) {
	try {
		const productAdd = yield call(() => 
			axios.put(constants.API_URL + 'updateProduct', action.payload)
		);
        
		if (productAdd.data.success) {
			yield put({ type: actions.PRODUCT_UPDATE_SUCCESS, payload: productAdd.data });
		} else {
			yield put({ type: actions.PRODUCT_UPDATE_ERROR, payload: productAdd.data });
		}

	} catch(error) {
		yield put({ type: actions.PRODUCT_ADD_ERROR, payload: error });		
	}
}

//watchers
export function* watchProductGetAll() {
	yield takeLatest(actions.PRODUCT_GET_ALL_REQUEST, productGetAllSaga)
}

export function* watchProductAdd() {
	yield takeLatest(actions.PRODUCT_ADD_REQUEST, productAddSaga)
}

export function* watchProductUpdate() {
	yield takeLatest(actions.PRODUCT_UPDATE_REQUEST, productUpdateSaga)
}