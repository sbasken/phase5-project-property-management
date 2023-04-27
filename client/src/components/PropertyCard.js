import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const PropertyCard = () => {
  return (
    <Card>
        <Image src='https://media.gettyimages.com/id/1080313282/video/smart-home-system-line-icon-animation-with-alpha.jpg?s=640x640&k=20&c=OXx_Fk5Z3v46ymrbW8e52mE2hoJ7v2G2V6lhDSMo1zQ=' wrapped ui={false} />
        <Card.Content>
            <Card.Header>Property Nickname</Card.Header>
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
  )
}

export default PropertyCard