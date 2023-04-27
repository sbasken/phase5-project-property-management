import React from 'react'
import { useSelector } from'react-redux'
import { Grid, Menu, Button } from 'semantic-ui-react'
import PropertyCard from './PropertyCard'
import { Link } from 'react-router-dom'

const PropertyPage = () => {

    const properties = useSelector(state => state.properties)
    console.log(properties)

    return (
        <div className='ui container hidden divider'>
            <Grid>
                <Grid.Column stretched width={13}>
                    <PropertyCard />
                </Grid.Column>
                <Grid.Column width={3}>
                <Button as={Link} to='/newproperty'>Add More</Button>
                </Grid.Column>

            </Grid>
            
        </div>

    )
}

export default PropertyPage