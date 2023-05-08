import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Button, Icon, Confirm } from 'semantic-ui-react'

import { useDeletePropertyMutation } from '../../app/services/propertiesAPI'

const PropertyCard = ({ property }) => {
    const [ deleteProperty ] = useDeletePropertyMutation()
    const [ open, setOpen ] = useState(false);
    console.log(property)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleDeleteClick() {
        handleOpen();
    }

    function handleConfirm() {
        deleteProperty(property.id)
        handleClose();
    }

    function handleCancel() {
        handleClose();
    }

  return (
        <Card 
            style={{ height: '300px' }}
        >
        <div style={{ height: '60%', overflow: 'hidden' }}>
            <Image
                src={property.image_url}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
        </div>
            <Card.Content>
                <Card.Header>{property.nickname}</Card.Header>
                {property.agent_id ? 
                <Card.Meta style={{ color: 'orange'}}>
                    <span >Managed By {property.agent.username} </span>
                    <p>{property.agent.email}</p>
                </Card.Meta>
                : null}
                <Card.Description>
                    {property.address}
                </Card.Description>
            </Card.Content>
            <Button.Group color='teal'>
            <Button 
                animated='fade' 
                floated='right' 
                as={Link} 
                to={`/properties/${property.id}/units`}
            >
                <Button.Content visible>See Details</Button.Content>
                <Button.Content hidden>
                    <Icon name='folder open outline' />
                </Button.Content>
            </Button>
            <Button animated='fade' floated='right' as={Link} to={`/properties/${property.id}`}>
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
  )
}

export default PropertyCard