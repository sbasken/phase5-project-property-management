import React from 'react'
import PropertyCard from './PropertyCard'
import { Grid, Button, Image } from 'semantic-ui-react'
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

    const noPropertiesYetMessage = (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>You have no properties yet.</h1>
            <Button as={Link} to='/properties/add-new'>
                Add More
            </Button>
        <br></br>
        <div style={{ width: '50rem', height: '30rem', position: 'relative', overflow: 'hidden' }}>
            <Image fluid style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='https://images.unsplash.com/photo-1560706834-afe1ba5d6737?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80' alt='building entrance'/>
        </div>
        </div>
      )

    return (
        <div className='ui container hidden divider'>
            { properties && properties.length > 0 ? 
            <Grid Columns={3} stackable>
                { content }
                <Grid.Column width={2}>
                <Button as={Link} to='/properties/add-new'>
                    Add More
                </Button>
                </Grid.Column>
            </Grid> : (noPropertiesYetMessage)}
            
        </div>

    )
}

export default PropertyPage