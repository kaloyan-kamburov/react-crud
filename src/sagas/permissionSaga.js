import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../common/constants';
import * as constants from '../common/constants';

function* permissionsCheckSaga(action) {
	try {
		const permissions = yield call(() => 
			axios.get(constants.API_URL + 'permissions')
		);

		if (permissions.data) {
			yield put({ type: actions.PERMISSIONS_CHECK_SUCCESS, payload: permissions.data });
		} else {
			yield put({ type: actions.PERMISSIONS_CHECK_ERROR, payload: permissions });
		}
	} catch(error) {
		yield put({ type: actions.PERMISSIONS_CHECK_ERROR, payload: error });		
	}
}

//action watchers
export function* watchPermissionsCheck() {
	yield takeLatest(actions.PERMISSIONS_CHECK_REQUEST, permissionsCheckSaga)
}