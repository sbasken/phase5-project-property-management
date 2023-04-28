import React from 'react'
import { useSelector } from'react-redux'
import { Grid, Menu, Icon, Button } from 'semantic-ui-react'
import PropertyCard from './PropertyCard'
import { Link } from 'react-router-dom';

const PropertyPage = () => {

    const properties = useSelector(state => state.properties)
    console.log(properties)

    return (
        <div className='ui container hidden divider'>
            <Grid Columns={3} stackable>
                <Grid.Column computer={7} tablet={16} mobile={16}>
                    <PropertyCard />
                </Grid.Column>
                <Grid.Column computer={7} tablet={16} mobile={16}>
                    <PropertyCard />
                </Grid.Column>
                <Grid.Column width={2}>
                <Button as={Link} to='/newProperty'>
                    Add More
                </Button>
                </Grid.Column>
            </Grid>
            
        </div>

    )
}

export default PropertyPage