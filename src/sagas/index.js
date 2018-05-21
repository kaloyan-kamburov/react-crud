import { all } from 'redux-saga/effects';
import { watchPermissionsCheckSaga } from './permissionSaga';



export default function* rootSaga() {
	yield all([
		watchPermissionsCheckSaga()
	])
}