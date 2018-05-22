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

export function* watchProductGetAll() {
	yield takeLatest(actions.PRODUCT_GET_ALL_REQUEST, productGetAllSaga)
}