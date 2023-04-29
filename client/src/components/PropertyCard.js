import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Button } from 'semantic-ui-react'

const PropertyCard = ({ property }) => {

  return (
    <>
    <Card 
        style={{ height: '280px' }}
        as={Link}
        to='/units'
    >
      <div style={{ height: '60%', overflow: 'hidden' }}>
          <Image
              src={property.image_url}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
      </div>
        <Card.Content>
            <Card.Header>{property.nickname}</Card.Header>
            {/* <Card.Meta>
                <span></span>
            </Card.Meta> */}
            <Card.Description>
                {property.address}
            </Card.Description>
        </Card.Content>
    </Card>
    <Button>Notify Tenants</Button>
  </>
  )
}

export default PropertyCard