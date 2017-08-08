import React from 'react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Bundle from './bundle.js'

// components
import HomeContainer from 'containers/HomeContainer'
import HelloWorld from 'containers/HelloWorld'

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

const App = () => (
    <Router>
        <HomeContainer>
            <Route exact path="/" component={HelloWorld} />
            <Route path="/react" component={createComponent(HelloReact)} />
        </HomeContainer>
    </Router>
)

export default App