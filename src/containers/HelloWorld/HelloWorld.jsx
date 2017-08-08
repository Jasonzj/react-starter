import React from 'react'
import { Link } from 'react-router-dom'

const HelloWorld = () => (
    <div>
        <h1>Hello World!</h1>
        <Link to="/react">
            <button>jump react</button>
        </Link>
    </div>
)

export default HelloWorld