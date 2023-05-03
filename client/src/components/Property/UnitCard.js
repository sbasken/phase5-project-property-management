import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Button, Grid } from 'semantic-ui-react'

const UnitCard = ({ unit }) => {
  console.log(unit)

  return (
    <>
    <Grid.Column computer={13} tablet={16} mobile={16}>
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
            <Card.Header>{unit.unit_number}</Card.Header>
            <Card.Meta>
              <span>{unit.vacant ? 'Vacant' : 'Occupied'}</span>
            </Card.Meta>
            <Card.Description>
            {unit.owner_occupied ? 'Owner Occupied': 'Rental Property'}
            </Card.Description>
          </Card.Content>
          <Button.Group attached='bottom'>
            <Button>View Lease Details</Button>
          </Button.Group>
        </Card>
      </Grid.Column>
    </>
  )
}

export default UnitCard