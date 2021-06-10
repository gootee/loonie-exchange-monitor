import Results from '../results'
import ReactDom from 'react-dom'

describe("App component", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDom.render(<Results></Results>, div)
    ReactDom.unmountComponentAtNode(div)
  })
});