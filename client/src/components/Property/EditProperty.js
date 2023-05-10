import React, { useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useGetPropertyQuery, useEditPropertyMutation } from '../../app/services/propertiesAPI';
import { useGetAgentsQuery } from '../../app/services/usersAPI';
import { Autocomplete } from '@react-google-maps/api'
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useFormik } from "formik";
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from "yup";

const EditProperty = ({ currentUser }) => {
    const { data: agents = [] } = useGetAgentsQuery();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: property = [], isLoading, isSuccess, isError, error } = useGetPropertyQuery(id)
    const [ editProperty ] = useEditPropertyMutation()

    const agentsOptions = agents?.map(agent => ({
        key: agent.id,
        text: `${agent.username}`,
        value: agent.id
    }));

    const formSchema = yup.object().shape({
        nickname: yup.string()
            .required('Required')
            .min(5, 'Nicknamename needs to be at least 5 characters long.')
            .max(15, 'Nicknamename needs to be at least 5 characters long.'),
        latitude: yup.number()
            .nullable()
            .min(-90, 'Latitude must be greater than or equal to -90')
            .max(90, 'Latitude must be less than or equal to 90'),
        longitude: yup.number()
            .nullable()
            .min(-180, 'Longitude must be greater than or equal to -180')
            .max(180, 'Longitude must be less than or equal to 180'),
        address: yup.string()
            .required('No address provided.'),
        image_url: yup.string(),
        owner_id: yup.number()
            .required("The terms and conditions must be accepted."),
      })
    
    const formik = useFormik({
        initialValues: {
            id: 0,
            nickname: '',
            latitude: 0,
            longitude: 0,
            address: '',
            image_url: 'https://media.gettyimages.com/id/1080313282/video/smart-home-system-line-icon-animation-with-alpha.jpg?s=640x640&k=20&c=OXx_Fk5Z3v46ymrbW8e52mE2hoJ7v2G2V6lhDSMo1zQ=',
            owner_id: currentUser.id,
            agent_id: null
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values)
            console.log("Updating property...")
            const { address } = values;
            getGeocode({ address }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);
                console.log("📍 Coordinates: ", { lat, lng });
                editProperty({ ...values, latitude: lat, longitude: lng })
                .then(() => {
                    console.log("Property successfully updated!")
                    navigate('/properties')
                })
            })
        }
    })

    const autocompleteRef = React.useRef(null)

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current.getPlace()
        const address = place.formatted_address
        formik.setFieldValue('address', address)
    }

    useEffect(() => {
        if (isSuccess) {
          formik.setValues({
            id: property.id,
            nickname: property.nickname,
            latitude: property.latitude,
            longitude: property.longitude,
            address: property.address,
            image_url: property.image_url,
            owner_id: property.owner_id,
            agent_id: property.agent_id,
          });
        }
    }, [property, isSuccess]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error && error.message}</div>;
    }


  return (
    
    <div className='ui container hidden divider'>
        <h1>Edit Your Property Details</h1>
        <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Property ID</label>
                    <input 
                        readOnly={true}
                        name="id"
                        placeholder='ID' 
                        value={formik.values.id}
                    />
                 </Form.Field>
                <Form.Field validate>
                    <label>Nickname</label>
                    <input 
                        type="text"
                        name="nickname"
                        placeholder='Nickname' 
                        value={formik.values.nickname}
                        onChange={formik.handleChange}
                    />
                    <p style={{ color: "orange" }}> {formik.errors.nickname}</p>
                </Form.Field>
                <Form.Field validate>
                    <label>Latitude</label>
                    <input 
                        type="number"
                        name="latitude"
                        placeholder='Latitude' 
                        value={formik.values.latitude}
                        onChange={formik.handleChange}
                    />
                    <p style={{ color: "orange" }}> {formik.errors.latitude}</p>
                </Form.Field>
                <Form.Field validate>
                    <label>Longitude</label>
                    <input 
                        type="number"
                        name="longitude"
                        placeholder='Longitude' 
                        value={formik.values.longitude}
                        onChange={formik.handleChange}
                    />
                    <p style={{ color: "orange" }}> {formik.errors.longitude}</p>
                </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field validate>
                    <label>Address</label>
                    <Autocomplete
                        onLoad={(autocomplete) => {
                            autocompleteRef.current = autocomplete
                          }}
                        onPlaceChanged={handlePlaceChanged}
                    >
                        <input 
                            type="text"
                            name="address"
                            placeholder='Address' 
                            value={formik.values.address}
                            onChange={formik.handleChange}
                        />
                    </Autocomplete>
                    <p style={{ color: "orange" }}> {formik.errors.address}</p>
                </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field validate>
                    <label>Image_url</label>
                    <input 
                        type="text"
                        name="image_url"
                        placeholder='Image_url' 
                        value={formik.values.image_url}
                        onChange={formik.handleChange}
                    />
                    <p style={{ color: "orange" }}> {formik.errors.image_url}</p>
                </Form.Field>
                <Form.Field validate>
                    <label>Owner ID</label>
                    <input 
                        type="number"
                        name="owner_id"
                        placeholder='Owner ID' 
                        value={formik.values.owner_id}
                        onChange={formik.handleChange}
                    />
                    <p style={{ color: "orange" }}> {formik.errors.owner_id}</p>
                </Form.Field>
                <Form.Field validate>
                    <label>Agent</label>
                        <select
                            type="number"
                            name="agent_id"
                            placeholder='Agent' 
                            value={formik.values.agent_id}
                            onChange={formik.handleChange}
                        >
                        <option value=''>Select Agent</option>
                            {agentsOptions?.map((agentOption) => (
                                <option key={agentOption.key} value={parseInt(agentOption.value)}>
                                    {agentOption.text}
                                </option>
                            ))}
                        </select>
                    <p style={{ color: "orange" }}> {formik.errors.agent_id}</p>
                </Form.Field>
            </Form.Group>
            <Button color='teal' type='submit'>Submit</Button>
        </Form>
    </div>
  )
}

export default EditProperty