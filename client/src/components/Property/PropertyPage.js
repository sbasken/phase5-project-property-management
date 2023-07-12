import React from 'react'
import PropertyCard from './PropertyCard'
import RingLoader from 'react-spinners/RingLoader';
import { Grid, Button, Image, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { useGetPropertiesQuery } from '../../app/services/propertiesAPI'
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const libraries = ['places']

const PropertyPage = ({ currentUser }) => {
    const { data: properties = [], isLoading, isError, error, isSuccess } = useGetPropertiesQuery()
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBgusvZwjxg1-bT2EVMc2-frImWN-0ev4s",
        libraries,
    });
    // Restricted ApiKey
    
    if (!isLoaded) {
        return <div>Map is loading...</div>
    }

    let content
    let markers

    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isError) {
        content = <div>{error.toString()}</div>
    } 

    if (isSuccess && properties.length > 0) {
        content = properties.map((property) => {
            return (
                <Grid.Column key={property.id} computer={8} tablet={16} mobile={16}>
                    <PropertyCard property={property} currentUser={currentUser}/> 
                </Grid.Column>
            )
        })
        markers = properties.map((property) => {
            if (property.latitude && property.longitude) {
                return <Marker position={{lat: property.latitude, lng: property.longitude}}/>
            }
        })
            
    }
    

    const noPropertiesYetMessage = (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>You have no properties yet.</h1>
            {currentUser.type === 'owner'? 
            <Button as={Link} to='/properties/add-new' basic color='orange' content='Orange'>
                Add More
            </Button> : <p style={{ color: 'orange' }}>Please contact property owner to add you as their agent to their property</p>
            }
        <br></br>
        <div style={{ width: '50rem', height: '30rem', position: 'relative', overflow: 'hidden' }}>
            <Image 
                fluid 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                src='https://www.bhg.com/thmb/TXKtfIyA_UUCOWtMsLXetN5Wvb8=/1493x0/filters:no_upscale():strip_icc()/gray-exterior-white-trim-path-09767f9e-83bad323e9d2473b90e69add9165c12f.jpg' 
                alt='building entrance'
            />
        </div>
        </div>
    )

    return (
        <div>
            <RingLoader color={'#F5A623'} loading={isLoading} />
            <div className='ui container hidden divider'>
                { properties && properties.length > 0 ? 
                <Grid stackable>
                    <Grid.Column width={3} >
                        <Menu fluid vertical tabular>
                            { currentUser.type === 'owner' ? <Button 
                                className='.yellow.button' 
                                as={Link} 
                                to='/properties/add-new' 
                                style={{ marginTop: '10px' }} 
                                basic color='orange' content='Orange'
                            >
                                Add More
                            </Button> : <Image src='https://wdy.h-cdn.co/assets/16/05/480x480/square-1454612525-baby-pandas.jpg' size='tiny' circular style={{ marginTop: '10px' }}/>}
                            
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={13}>
                        <Grid columns={2} stackable>
                            { content }  
                        </Grid>
                        <div style={{width: '80vw', height: '80vh', marginTop: '5vh'}}>
                            <GoogleMap zoom={10} center={{lat: 47.6062, lng: -122.3321}} mapContainerStyle={{ width: '80%', height: '80%' }}>
                                { markers }
                            </GoogleMap>
                        </div>
                    </Grid.Column>
                </Grid> : (noPropertiesYetMessage)}
            </div>
        </div>

    )
}

export default PropertyPage