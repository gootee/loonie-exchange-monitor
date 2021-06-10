import ResultToggle from '../result-toggle'
import ReactDom from 'react-dom'

describe("App component", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDom.render(<ResultToggle></ResultToggle>, div)
    ReactDom.unmountComponentAtNode(div)
  })
});