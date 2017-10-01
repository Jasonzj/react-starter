import { createStore } from 'redux'
import counter from 'reducers/counter'

let store = null
if (__DEV__) { // 开发环境
    store = createStore(
        counter,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
} else {
    store = createStore(counter)
}

export default store