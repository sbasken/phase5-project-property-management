import { useParams } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import { useGetUnitQuery, useEditUnitMutation } from '../../../app/services/unitsAPI';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'

import * as yup from "yup";


const options = [
    { key: 'o', text: 'Owner Occupied', value: true },
    { key: 'f', text: 'Rental Property', value: false },
  ]

const EditUnit = () => {
    const { id, unitid } = useParams()
    const { data: unit = [], isLoading, isError, error } = useGetUnitQuery(unitid)
    const [ editUnit ] = useEditUnitMutation()
    let navigate = useNavigate();

    const formSchema = yup.object().shape({
        unit_number: yup.string()
            .required('Required'),
      })

    const formik = useFormik({
        initialValues: {
            id: unitid,
            unit_number: unit.unit_number,
            owner_occupied: false,
            vacant: true,
            property_id: parseInt(id),
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log("Updating unit details...")
            if (formik.isValid) {
                editUnit(values)
                console.log("Unit successfully updated!")
                navigate(`/properties/${id}/units`)
            }
        }
    })

    if (isError) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div>
            <RingLoader color={'#F5A623'} loading={isLoading} />
            <div className='ui container hidden divider'>
                <h1>Edit Unit Info</h1>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Unit ID</label>
                            <input 
                                readOnly={true}
                                name="id"
                                placeholder='ID' 
                                value={formik.values.id}
                            />
                            <p style={{ color: "orange" }}> {formik.errors.id}</p>
                        </Form.Field>
                        <Form.Field validate>
                            <label>Unit Number</label>
                            <input 
                                type='text'
                                name='unit_number'
                                placeholder='Unit Number' 
                                value={formik.values.unit_number}
                                onChange={formik.handleChange}
                            />
                            <p style={{ color: "orange" }}> {formik.errors.unit_number}</p>
                        </Form.Field>
                        <Form.Field>
                            <label>Owner Occupied or Rental Property</label>
                            <select 
                                type="string"
                                name="owner_occupied"
                                placeholder='Owner Occupied' 
                                value={formik.values.owner_occupied}
                                onChange={formik.handleChange}
                            >
                            <option value=''>Select a property</option>
                                {options.map((option) => (
                                    <option key={option.key} value={option.value}>
                                        {option.text}
                                    </option>
                                ))}
                        </select>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <label>Occupied / Vacant?</label>
                        <Form.Radio
                            toggle
                            label={formik.values.vacant ? "Vacant" : "Occupied"}
                            checked={formik.values.vacant}
                            onChange={() => formik.setFieldValue("vacant", !formik.values.vacant)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <label>Property ID</label>
                            <input   
                                readOnly={true}
                                placeholder='Property ID' 
                                value={formik.values.property_id}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        </div>
    )

    
}

export default EditUnit