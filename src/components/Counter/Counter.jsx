import React from 'react'
import PropTypes from 'prop-types'

const Counter = ({
    value,
    onIncrement,
    onDecrement
}) => (
    <div>
        <h1>{ value }</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
)

Counter.propTypes = {
    value: PropTypes.number,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func
}

export default Counter