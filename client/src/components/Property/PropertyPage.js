import React from 'react'
import PropertyCard from './PropertyCard'
import RingLoader from 'react-spinners/RingLoader';
import { Grid, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { useGetPropertiesQuery } from '../../app/services/propertiesAPI'

const PropertyPage = () => {
    const { data: properties = [], isLoading, isError, error, isSuccess } = useGetPropertiesQuery()
    console.log(properties)

    let content

    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isError) {
        content = <div>{error.toString()}</div>
    } else if (isSuccess && properties.length > 0) {
        content = properties.map(property => (<PropertyCard key={property.id} property={property}/>))
    }

    const noPropertiesYetMessage = (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>You have no properties yet.</h1>
            <Button as={Link} to='/properties/add-new'>
                Add More
            </Button>
        <br></br>
        <div style={{ width: '50rem', height: '30rem', position: 'relative', overflow: 'hidden' }}>
            <Image fluid style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='https://www.bhg.com/thmb/TXKtfIyA_UUCOWtMsLXetN5Wvb8=/1493x0/filters:no_upscale():strip_icc()/gray-exterior-white-trim-path-09767f9e-83bad323e9d2473b90e69add9165c12f.jpg' alt='building entrance'/>
        </div>
        </div>
    )

    return (
        <div>
            <RingLoader color={'#F5A623'} loading={isLoading} />
            <div className='ui container hidden divider'>
                { properties && properties.length > 0 ? 
                <Grid Columns={3}>
                    <Grid.Column width={2}>
                    <Button as={Link} to='/properties/add-new' style={{ marginTop: '10px' }}>
                        Add More
                    </Button>
                    <Image src='https://wdy.h-cdn.co/assets/16/05/480x480/square-1454612525-baby-pandas.jpg' size='tiny' circular style={{ marginTop: '10px' }}/>
                    </Grid.Column>
                    { content }
                </Grid> : (noPropertiesYetMessage)}
                
            </div>
        </div>

    )
}

export default PropertyPage