import axios from 'axios'

export const SET_INCREMENT = 'SET_INCREMENT'
export const SET_DECREMENT = 'SET_DECREMENT'
export const SET_DATA = 'SET_DATA'

export const increment = () => ({
    type: SET_INCREMENT
})

export const decrement = () => ({
    type: SET_DECREMENT
})

export const setData = data => ({
    type: SET_DATA,
    data
})

export const getData = () => async (dispatch) => {
    const data = await axios.get('/book/navigation')
    dispatch(setData(data.data.data))
}

