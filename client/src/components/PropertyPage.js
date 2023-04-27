import React from 'react'
import { useSelector } from'react-redux'

const PropertyPage = () => {

    const properties = useSelector(state => state.properties)
    console.log(properties)

    return (
        <div>PropertyPage
            <h2>properties</h2>
            <h3>{properties.property1}</h3>
        </div>
    )
}

export default PropertyPage