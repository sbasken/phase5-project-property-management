import React from 'react'
import { Grid, Button } from 'semantic-ui-react'
import PropertyCard from './PropertyCard'
import { Link } from 'react-router-dom';

import { useFetchPropertiesQuery } from '../features/properties/propertiesSlice'

const PropertyPage = () => {

    const { data=[], isLoading, isSuccess, isError, error } = useFetchPropertiesQuery()

    console.log(data)

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