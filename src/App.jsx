import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import asyncComponent from './AsyncComponent'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

// renducers
import counter from 'reducers/counter'

// components
import HomeContainer from 'containers/HomeContainer'
import HelloWorld from 'containers/HelloWorld'
import NotFound from 'containers/404.jsx'

// lazyContainer
const HelloReact = asyncComponent(() => import(/* webpackChunkName: "HelloReact" */ './containers/HelloReact/index'))

// style
import './app.scss'

// store
let store = null
if (__DEV__) { // 开发环境
    store = createStore(
        counter,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
} else {
    store = createStore(counter)
}

const App = () => (
    <Provider store={store}>
        <Router>
            <HomeContainer>
                <Switch>
                    <Route exact path="/" component={HelloWorld} />
                    <Route path="/react" component={HelloReact} />
                    <Route component={NotFound} />
                </Switch>
            </HomeContainer>
        </Router>
    </Provider>
)

export default App