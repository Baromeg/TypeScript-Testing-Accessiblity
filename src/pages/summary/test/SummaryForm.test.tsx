import React from 'react'
import {
  queryByText,
  queryByTitle,
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm'

describe('Checkbox functionality', () => {
  test('Checkbox is unchecked by default', () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i
    })
    const confirmButton = screen.getByRole('button', { name: /Confirm order/i })

    expect(checkbox).not.toBeChecked()
    expect(confirmButton).toBeDisabled()
  })
  test('Checkbox enables button when checked', () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i
    })
    const confirmButton = screen.getByRole('button', { name: /Confirm order/i })

    userEvent.click(checkbox)
    expect(confirmButton).toBeEnabled()

    userEvent.click(checkbox)
    expect(confirmButton).toBeDisabled()
  })

  test('popover responds to hover', async () => {
    render(<SummaryForm />)
    // popover starts out hidden
    const nullPopover = screen.queryByText(/You will get nothing out of this/i)
    expect(nullPopover).not.toBeInTheDocument()

    // popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i)
    userEvent.hover(termsAndConditions)
    const popover = screen.getByText(/You will get nothing out of this/i)
    expect(popover).toBeInTheDocument()

    // popover disappears when we mouse out
    userEvent.unhover(termsAndConditions)
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/You will get nothing out of this/i)
    )
  })
})
