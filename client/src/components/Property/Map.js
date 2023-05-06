import { GoogleMap, Marker } from '@react-google-maps/api'


const Map = () => {

    return (
        <GoogleMap zoom={10} center={{lat: 47.6062, lng: -122.3321}} mapContainerStyle={{ width: '80%', height: '80%' }}></GoogleMap>
    )
}

export default Map