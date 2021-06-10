import App from '../App'
import ReactDom from 'react-dom'

describe("App component", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDom.render(<App />, div)
    ReactDom.unmountComponentAtNode(div)
  })
});