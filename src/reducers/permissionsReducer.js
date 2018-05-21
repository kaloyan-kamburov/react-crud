import initialState from './initialState';
import * as actions from '../common/constants';

const permissionsReducer = (state = initialState.permissions, action) => {
	switch (action.type) {
		case actions.PERMISSIONS_CHECK_SUCCESS:
			return [
				...action.payload.permissions
			]
		
		case actions.PERMISSIONS_CHECK_ERROR:
			return "ERROR WHILE GETTING PERMISSIONS"
			
		default:
			return state;
	}
}

export default permissionsReducer;