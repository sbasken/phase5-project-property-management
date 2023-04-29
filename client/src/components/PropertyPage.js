import React from 'react'
import PropertyCard from './PropertyCard'
import { Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { useGetPropertiesQuery } from '../app/services/propertiesAPI'

const PropertyPage = () => {

    const { data: properties = [], isLoading, isSuccess, isError, error } = useGetPropertiesQuery()

    let content

    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isSuccess) {
        content = properties.map(property => <PropertyCard key={property.id} property={property}/>)
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <div className='ui container hidden divider'>
            <Grid Columns={3} stackable>
                { content }
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