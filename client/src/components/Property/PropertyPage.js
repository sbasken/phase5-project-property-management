import React from 'react'
import PropertyCard from './PropertyCard'
import RingLoader from 'react-spinners/RingLoader';
// import Map from './Map';
import { Grid, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { useGetPropertiesQuery } from '../../app/services/propertiesAPI'
// import { useLoadScript } from '@react-google-maps/api'
// import { getGeocode, getLatLng } from 'use-places-autocomplete';

// const libraries = ['places']

const PropertyPage = () => {
    const { data: properties = [], isLoading, isError, error, isSuccess } = useGetPropertiesQuery()
    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_KEY,
    //     libraries,
    // });
    
    // if (!isLoaded) {
    //     return <div>Map is loading...</div>
    // }

    let content

    // const generateLatLng = async (address) => {
    //     try {
    //         const results = await getGeocode({ address });
    //         console.log('result:', results)
    //         if (results.length === 0) {
    //          return;
    //         } else {
    //             const { lat, lng } = await getLatLng(results);
    //             if (lat && lng) {
    //                 return {lat, lng};
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error while generating lat and lng:', error);
    //     }
    // };

    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isError) {
        content = <div>{error.toString()}</div>
    } 

    if (isSuccess && properties.length > 0) {
            content = properties.map((property) => {
                // const latlng = generateLatLng(property.address)
                // console.log('latlng generated', latlng)
                return (
                    <>
                        <PropertyCard key={property.id} property={property}/>
                        {/* <Map key={property.id} latlng={latlng} /> */}
                    </>
                )
            })
            
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