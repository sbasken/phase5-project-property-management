import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image, Button } from 'semantic-ui-react'

const PropertyCard = () => {
  return (
    <>
    <Card 
        style={{ height: '320px' }}
        as={Link}
        to='/units'
    >
      <div style={{ height: '60%', overflow: 'hidden' }}>
          <Image
              src='https://media.gettyimages.com/id/1080313282/video/smart-home-system-line-icon-animation-with-alpha.jpg?s=640x640&k=20&c=OXx_Fk5Z3v46ymrbW8e52mE2hoJ7v2G2V6lhDSMo1zQ='
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
      </div>
        <Card.Content>
            <Card.Header>Property 1</Card.Header>
            <Card.Meta>
                <span>building manager</span>
            </Card.Meta>
            <Card.Description>
                7777 Flatiron st. Denver, CO 12345
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='home' />
                4 units
            </a>
        </Card.Content>
    </Card>
    <Button>Notify Tenants</Button>
  </>
  )
}

export default PropertyCard