import React from 'react'
import Bundle from './bundle.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
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
import HelloReact from 'bundle-loader?lazy&name=HelloReact-[name]!containers/HelloReact/index.js'

// style
import './app.scss'

// router
const createComponent = component => () => (
    <Bundle load={component}>
        { Component => <Component /> }
    </Bundle>
)

const store = createStore(
    counter
)

const App = () => (
    <Provider store={store}>
        <Router>
            <HomeContainer>
                <Switch>
                    <Route exact path="/" component={HelloWorld} />
                    <Route path="/react" component={createComponent(HelloReact)} />
                    <Route component={NotFound} />
                </Switch>
            </HomeContainer>
        </Router>
    </Provider>
)

export default App