import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
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

    fireEvent.click(checkbox)
    expect(confirmButton).toBeEnabled()

    fireEvent.click(checkbox)
    expect(confirmButton).toBeDisabled()
  })
})
