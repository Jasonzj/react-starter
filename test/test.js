import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HelloReact from '../src/containers/HelloReact/index.js'

configure({ adapter: new Adapter() })

describe('HelloReact component', () => {
    it('should render dom', () => {
        const wrapper = shallow(<HelloReact />)
        expect(wrapper.find('h1').text()).toContain('React starter')
    })
})