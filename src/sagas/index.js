import { all } from 'redux-saga/effects';
import { watchPermissionsCheck } from './permissionSaga';
import { watchProductGetAll } from './productSaga';



export default function* rootSaga() {
	yield all([
		watchPermissionsCheck(),
		watchProductGetAll()
	])
}