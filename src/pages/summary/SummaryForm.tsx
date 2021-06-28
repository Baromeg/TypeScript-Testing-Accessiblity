import React from 'react'
import { useState } from 'react'
import { JsxElement } from 'typescript'

function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false)
  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: 'blue' }}> Terms and Conditions</span>
    </span>
  )
  return (
    <form>
      <input
        type='checkbox'
        defaultChecked={tcChecked}
        onChange={(e) => {
          setTcChecked(e.target.checked)
        }}
        aria-label='I accept the terms and conditions'
        id=''
      />
      <button type='submit' disabled={!tcChecked}>
        Confirm Order
      </button>
    </form>
  )
}

export default SummaryForm
