import React from 'react'
import {
  render,
  screen,
  cleanup,
  waitFor,
  act,
  fireEvent
} from '@testing-library/react'
import App, { replaceCamelWithSpaces } from './App'
import axios from 'axios'

test('renders Data Stories header', () => {
  // Render creates a virtual dom for the selected component
  render(<App />)
  const textElement = screen.getByText(/donuts/i)
  // Assertion would determine if test passes or fails
  // * Expect is a global Jest's method
  // * (Argument) What the assertion is assessing againts
  // * Matcher / Matcher Argument
  expect(textElement).toBeInTheDocument()
})

test('Renders a button', () => {
  render(<App />)
  const buttonElement = screen.getByRole('button', {
    name: /change to Midnight Blue/i
  })
  expect(buttonElement).toBeInTheDocument()
})

test('Button has correct initial color', () => {
  render(<App />)

  // find an element with a role of button and text of 'Change to Midnight Blue'
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue'
  })

  // expect the background color to be MediumVioletRed
  expect(colorButton).toHaveStyle('background-color: MediumVioletRed')

  // click button
  fireEvent.click(colorButton)

  // expect to have a background color of MidnightBlue
  expect(colorButton).toHaveStyle('background-color: MidnightBlue')

  // expect the button text to be 'Change to MediumVioletRed'
  expect(colorButton.textContent).toBe('Change to Medium Violet Red')
})

test('initial conditions', () => {
  render(<App />)
  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue'
  })
  expect(colorButton).toBeEnabled()
  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()
})

test('when checkbox is checked, button should be disabled', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue'
  })
  const checkBox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(checkBox)
  expect(colorButton).toBeDisabled()

  fireEvent.click(checkBox)
  expect(colorButton).toBeEnabled()
})

test('when checkbox is checked, button should be gray', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue'
  })
  const checkBox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(checkBox)
  expect(colorButton).toHaveStyle('background-color: gray')

  fireEvent.click(checkBox)
  expect(colorButton).toHaveStyle('background-color: MediumVioletRed;')
})

// * Unit Testing Function
describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  })
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})
