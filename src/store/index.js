import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import axios from 'axios';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import * as actions from '../common/constants';

const sagaMiddleWare = createSagaMiddleWare();
const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(sagaMiddleWare)
)

sagaMiddleWare.run(rootSaga);

axios.interceptors.response.use(
	null, 
	error => {
		store.dispatch({ type: actions.SERVER_ERROR });
	}
)



export default store;