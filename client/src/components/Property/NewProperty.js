import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useAddPropertyMutation } from '../../app/services/propertiesAPI';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom'
import * as yup from "yup";

const NewProperty = ({ currentUser }) => {
    const [ addProperty, isLoading, isError, error ] = useAddPropertyMutation()
    let navigate = useNavigate();
    console.log(currentUser.id)

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
      })

    const formik = useFormik({
        initialValues: {
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
            console.log("Creating a new property...")
            if (formik.isValid) {
                addProperty(values)
                console.log("Property successfully created!")
                navigate('/properties')
            }
        }
    })

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

  return (
    <div className='ui container hidden divider'>
        <h1>New Property Info</h1>
        <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <Form.Group widths='equal'>
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
                    <input 
                        type="text"
                        name="address"
                        placeholder='Address' 
                        value={formik.values.address}
                        onChange={formik.handleChange}
                    />
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
                    <label>Agent ID</label>
                    <input 
                        type="number"
                        name="agent_id"
                        placeholder='Agent ID' 
                        value={formik.values.agent_id}
                        onChange={formik.handleChange}
                    />
                    <p style={{ color: "orange" }}> {formik.errors.agent_id}</p>
                </Form.Field>
            </Form.Group>
            <Button type='submit'>Submit</Button>
        </Form>
    </div>
  )
}

export default NewProperty