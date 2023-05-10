// import { GoogleMap, Marker } from '@react-google-maps/api';

// const Map = ({ markers }) => {

//     //version 1
//     return (
//         <GoogleMap zoom={10} center={{lat: 47.6062, lng: -122.3321}} mapContainerStyle={{ width: '80%', height: '80%' }}>
//             { markers.map(marker => {
//                 console.log('inside markers map', marker)
//                 return <Marker key={marker.lat + marker.lng} position={marker}/>
            
//             })}
//         </GoogleMap>
        
//     );

    /////// version 2
//   const [markerContent, setMarkerContent] = useState(null);


//   useEffect(() => {
//     const content = markers.map((marker) => (
//         <Marker key={marker.lat + marker.lng} position={{ lat: marker.lat, lng: marker.lng }} />
//     ));
//     setMarkerContent(content);
//   }, [markers])
//   console.log('markerContent', markerContent)
    

//   return (
//     <GoogleMap
//       zoom={10}
//       center={{ lat: 47.6062, lng: -122.3321 }}
//       mapContainerStyle={{ width: '80%', height: '80%' }}
//     >
//       { markerContent}
//     </GoogleMap>
//   );
// };


// export default Map

//        
