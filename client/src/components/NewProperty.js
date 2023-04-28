import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const NewProperty = () => {
  return (
    <div className='ui container hidden divider'>
        <h1>New Property Info</h1>
        <Form>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Nickname</label>
                    <input placeholder='Nickname' />
                </Form.Field>
                <Form.Field>
                    <label>Latitude</label>
                    <input placeholder='Latitude' />
                </Form.Field>
                <Form.Field>
                    <label>Longitude</label>
                    <input placeholder='Longitude' />
                </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Address</label>
                    <input placeholder='Address' />
                </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Image URL</label>
                    <input placeholder='Image URL' />
                </Form.Field>
                <Form.Field>
                    <label>Owner ID</label>
                    <input type='number' min='0' placeholder='Owner ID' />
                </Form.Field>
                <Form.Field>
                    <label>Agent ID</label>
                    <input type='number' min='0' placeholder='Agent ID' />
                </Form.Field>
            </Form.Group>
            <Form.Field>
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    </div>
  )
}

export default NewProperty