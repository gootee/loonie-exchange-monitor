import React from "react"
import ReactDom from 'react-dom'
import Header from '../Header'
import { render, cleanup } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect" 
import renderer from "react-test-renderer"

afterEach(cleanup)

it(("renders without crashing"), () => {
  const div = document.createElement("div")
  ReactDom.render(<Header title="test"></Header>, div)
})

it ("renders header correctly", () => {
  const {getByTestId} = render(<Header title="Click me"></Header>)
  expect(getByTestId('header')).toHaveTextContent("Click me")
})

it ("matches snapshot", () => {
  const tree = renderer.create(<Header title="Loonie Exchange Monitor"></Header>).toJSON()
  expect(tree).toMatchSnapshot()
})