import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'

const options = [
    { key: 'o', text: 'Owner Occupied', value: 'True' },
    { key: 'f', text: 'Rental Property', value: 'Flase' },
  ]

const NewUnit = () => {
    const [value, setValue] = useState('');

    const handleChange = (e, { value }) => setValue(value);

  return (
    <div className='ui container hidden divider'>
        <h1>New Unit Info</h1>
        <Form>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Unit Number</label>
                    <input placeholder='Unit Number' />
                </Form.Field>
                <Form.Select
                    fluid
                    label='Owner Occupied'
                    options={options}
                    placeholder='Owner Occupied'
                />
            </Form.Group>
            <Form.Group>
                <label>Vacant</label>
                <Form.Radio
                    label='Vacant'
                    value='vacant'
                    checked={value === 'vacant'}
                    onChange={handleChange}
                />
                <Form.Radio
                    label='Occupied'
                    value='occupied'
                    checked={value === 'occupied'}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Field>
                    <label>Property ID</label>
                    <input type='number' min='0' placeholder='Property ID' />
                </Form.Field>
            </Form.Group>
            <Button type='submit'>Submit</Button>
        </Form>
    </div>
  )
}

export default NewUnit