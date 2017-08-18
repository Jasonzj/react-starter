import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { AppContainer } from 'react-hot-loader'

render(
    <AppContainer>
        <App />
    </AppContainer>
    ,
    document.getElementById('root')
)

if (module.hot) {  
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    // 如果用 ES 模块模式的 Webpack 2，可以直接用 <App />
    module.hot.accept('./App.jsx', () => {
        const NextApp = require('./App.jsx').default
        render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            document.getElementById('root')
        )
    })
}