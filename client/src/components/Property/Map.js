import { GoogleMap } from '@react-google-maps/api'


const Map = () => {

    return (
        <GoogleMap zoom={15} center={{lat: 47, lng: -122}} mapContainerStyle={{ width: '80%', height: '80%' }}></GoogleMap>
    )
}

export default Map