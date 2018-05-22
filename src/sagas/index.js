import { all } from 'redux-saga/effects';
import { watchPermissionsCheck } from './permissionSaga';
import { 
	watchProductGetAll,
	watchProductAdd,
	watchProductUpdate
} from './productSaga';



export default function* rootSaga() {
	yield all([
		watchPermissionsCheck(),
		watchProductGetAll(),
		watchProductAdd(),
		watchProductUpdate()
	])
}