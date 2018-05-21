import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleWare = createSagaMiddleWare();
const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(sagaMiddleWare)
)

sagaMiddleWare.run(rootSaga);

export default store;