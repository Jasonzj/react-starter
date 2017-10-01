import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// components
import Counter from 'components/Counter'

// action
import { increment, decrement } from 'action'

@connect(
    state => ({
        value: state
    }),
    dispatch => ({
        onIncrement() {
            dispatch(increment())
        },
        onDecrement() {
            dispatch(decrement())
        }
    })
)
class HelloWorld extends PureComponent {
    render() {
        const { value, onIncrement, onDecrement } = this.props

        return (
            <div>
                <h1>Hello World!</h1>
                <Link to="/react">
                    <button>jump react2</button>
                </Link>
                <Counter
                    value={value}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                />
            </div>
        )
    }
}

HelloWorld.propTypes = {
    value: PropTypes.number,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func
}

export default HelloWorld