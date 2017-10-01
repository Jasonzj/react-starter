import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// components
import Counter from 'components/Counter'

// action
import { getData, increment, decrement } from 'action'

@connect(
    state => ({
        value: state.counter,
        data: state.data
    }),
    dispatch => ({
        onIncrement() {
            dispatch(increment())
        },
        onDecrement() {
            dispatch(decrement())
        },
        onIncrementAsync() {
            dispatch(getData())
        }
    })
)
class HelloWorld extends PureComponent {
    render() {
        const { value, data, onIncrement, onDecrement, onIncrementAsync } = this.props

        return (
            <div>
                <h1>Hello World!</h1>
                <Link to="/react">
                    <button>jump react</button>
                </Link>
                <Counter
                    value={value}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                    onIncrementAsync={onIncrementAsync}
                />
                {
                    data.map(item => (
                        <p key={item.id}>
                            {item.text}
                        </p>
                    ))
                }
            </div>
        )
    }
}

HelloWorld.propTypes = {
    data: PropTypes.any,
    value: PropTypes.number,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func,
    onIncrementAsync: PropTypes.func
}

export default HelloWorld