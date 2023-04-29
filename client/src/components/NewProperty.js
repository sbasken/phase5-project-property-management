import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useAddPropertyMutation } from '../app/services/propertiesAPI';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom'
import * as yup from "yup";

const NewProperty = ({ currentUser }) => {
    const [ addProperty, { isLoading } ] = useAddPropertyMutation()
    let navigate = useNavigate();

    const formSchema = yup.object().shape({
        nickname: yup.string()
            .required('Required')
            .min(5, 'Nicknamename needs to be at least 5 characters long.')
            .max(15, 'Nicknamename needs to be at least 5 characters long.'),
        latitude: yup.number()
            .min(-90, 'Latitude must be greater than or equal to -90')
            .max(90, 'Latitude must be less than or equal to 90'),
        longitude: yup.number()
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
            nickname: '',
            latitude: 0,
            longitude: 0,
            address: '',
            image_url: '',
            owner_id: currentUser.id,
            agent_id: null
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log("Creating a new property...")
            if (formik.isValid) {
                addProperty(values)
                console.log("User successfully created!")
                navigate('/properties')
            }
        }
    })

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
                </Form.Field>
            </Form.Group>
            <Button type='submit'>Submit</Button>
        </Form>
    </div>
  )
}

export default NewProperty