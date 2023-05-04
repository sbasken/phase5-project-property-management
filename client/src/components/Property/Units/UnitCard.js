import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, Image, Button, Grid, Icon, Confirm } from 'semantic-ui-react'
import { useDeleteUnitMutation } from '../../../app/services/unitsAPI'


const UnitCard = ({ unit }) => {
  const { id } = useParams()
  const [ open, setOpen ] = useState(false);
  const [ deleteUnit ] = useDeleteUnitMutation()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleDeleteClick() {
      handleOpen();
  }

  function handleConfirm() {
      deleteUnit(unit.id)
      handleClose();
  }

  function handleCancel() {
      handleClose();
  }

  return (
    <Grid.Column  computer={7} tablet={16} mobile={16}>
      <Card style={{ height: '320px' }}>
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
        <Button.Group >
          <Button 
            animated='fade' 
            floated='right' 
            as={Link} 
            to={`/properties/${id}/units/${unit.id}/lease`}
          >
            <Button.Content visible>View Details</Button.Content>
            <Button.Content hidden>
                <Icon name='folder open outline' />
            </Button.Content>
          </Button>
          <Button animated='fade' floated='right' as={Link} to={`/properties/${id}/units/${unit.id}`}>
            <Button.Content visible>Edit</Button.Content>
            <Button.Content hidden>
              <Icon name='edit' />
            </Button.Content>
          </Button>
          <Button animated='fade' floated='right' onClick={handleDeleteClick}>
            <Button.Content visible>Delete</Button.Content>
            <Button.Content hidden>
              <Icon name='delete' />
            </Button.Content>
          </Button>
          <Confirm
            open={open}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
          />
        </Button.Group>
      </Card>
    </Grid.Column>

  )
}

export default UnitCard