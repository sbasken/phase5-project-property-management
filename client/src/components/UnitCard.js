import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'

const UnitCard = () => {
  return (
    <Card 
      style={{ height: '320px' }}
      
    >
      <div style={{ height: '60%', overflow: 'hidden' }}>
        <Image
          src='https://st2.depositphotos.com/1031359/5842/v/950/depositphotos_58425503-stock-illustration-colourful-set-of-keys.jpg'
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <Card.Content>
        <Card.Header>Unit A1</Card.Header>
        <Card.Meta>
          <span>Vacant</span>
        </Card.Meta>
        <Card.Description>
          Owner Occupied
        </Card.Description>
      </Card.Content>
      <Button.Group attached='bottom'>
      <Button>View Expenses</Button>
      <Button>View Lease</Button>
    </Button.Group>
  </Card>
  )
}

export default UnitCard