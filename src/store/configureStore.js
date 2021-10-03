import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './rootReducers'
import createSagaMiddleWare from 'redux-saga'
import rootSaga from './rootSaga'
// import LocalStorage from 'redux-persist/lib/storage'
// import { persistReducer } from 'redux-persist'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const persistConfig = {
//   key: 'letters',
//   storage: LocalStorage,
// }

const sagaMiddleWare = createSagaMiddleWare()
const middleware = [sagaMiddleWare]
const enhancer = []

if (middleware.length > 0) {
    enhancer.push(applyMiddleware(...middleware))
}

// const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(rootReducer, composeEnhancers(...enhancer))

sagaMiddleWare.run(rootSaga, store)

export default store