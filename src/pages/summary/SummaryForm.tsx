import React from 'react'
import { useState } from 'react'
import { JsxElement } from 'typescript'
import { OverlayTrigger, Button, Tooltip, Popover, Form } from 'react-bootstrap'

function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false)
  const nodeRef = React.useRef(null)

  const popover = (props: any) => (
    <Popover id='termsandconditions-popover'>
      <Popover.Content>You will get nothing out of this</Popover.Content>
    </Popover>
  )
  const checkboxLabel = (
    <span>
      I agree to{' '}
      <OverlayTrigger
        placement='right'
        // delay={{ show: 250, hide: 400 }}
        overlay={popover}
      >
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  )
  return (
    <Form>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={tcChecked}
          onChange={(e) => {
            setTcChecked(e.target.checked)
          }}
          label={checkboxLabel}
        />
      </Form.Group>

      <Button type='submit' disabled={!tcChecked}>
        Confirm Order
      </Button>
    </Form>
  )
}

export default SummaryForm
