import DatePicker from 'react-datepicker';
import { Button, Form } from 'semantic-ui-react'
import { useAddTenantMutation } from '../../../app/services/tenantsAPI';
import { useAddLeaseMutation } from '../../../app/services/leasesAPI';
import { useFormik } from "formik";
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from "yup";

const NewLease = () => {
  const [ addLease, {isLoading, isError, error} ] = useAddLeaseMutation()
  const [ addTenant ] = useAddTenantMutation()
  let navigate = useNavigate();
  const { id, unitid } = useParams();
  // console.log(currentUser.id)
  const phoneNumberRegEx = /^(\d{3}[ \-]*)*?\d{3}[ \-]*\d{4}$/
  
  const formSchema = yup.object().shape({
    name: yup.string()
      .required('Required')
      .min(5, 'Nicknamename needs to be at least 5 characters long.')
      .max(15, 'Nicknamename needs to be less than 15 characters long.'),
    phone_number: yup.string()
      .required('Required')
      .matches(phoneNumberRegEx, 'Phone number is not valid'),
    email: yup.string()
      .required('Required')
      .email('Invalid email'),
    start_date: yup.date()
      .required('Required'),
    end_date: yup.date()
      .required('Required'),
    rent: yup.number()
      .required('Required'),
    deposit: yup.number(),
  })

  const formik = useFormik({
      initialValues: {
        name: '',
        phone_number: '',
        email: '',
        start_date: 0,
        end_date: 0,
        rent: 0,
        deposit: 0,
        unit_id: unitid,
        tenant_id: 0
      },
      validationSchema: formSchema,
      onSubmit: async (values) => {
        if (formik.isValid) {
          try {
            console.log("Creating a new tenant...")
            const tenantData = {
              name : values.name,
              phone_number : values.phone_number,
              email : values.email
            }
            console.log('tenantData',tenantData)
            const { data } = await addTenant(tenantData)
            console.log(data)
            console.log("Tenant successfully created!")
            const leaseData = {
              start_date : values.start_date,
              end_date : values.end_date,
              rent : values.rent,
              deposit : values.deposit,
              unit_id: values.unit_id,
              tenant_id : data.id
            }
              const { data: lease = [] } = await addLease(leaseData)
              console.log(lease)
              console.log('Lease successfully created!') 
              navigate(`/properties/${id}/units/${unitid}/lease`)
          } catch (error) {
            alert('Tenant could not be created. Please try again.')
        }
      }
    }
  })

    console.log(formik.values)
    if (isError) {
        return <div>Error: {error.message}</div>;
    }

  return (
    <div className='ui container hidden divider'>
        <h1>New Lease Info</h1>
        <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <Form.Group widths='equal'>
              <Form.Field validate>
                <label>Name</label>
                <input 
                  type="text"
                  name="name"
                  placeholder='Name' 
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  />
                  <p style={{ color: "orange" }}> {formik.errors.name}</p>
              </Form.Field>
              <Form.Field validate>
                <label>Phone Number</label>
                <input 
                  type="text"
                  name="phone_number"
                  placeholder='Phone Number' 
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                />
                <p>☎ 000-000-0000</p>
                <p style={{ color: "orange" }}> {formik.errors.phone_number}</p>
              </Form.Field>
              <Form.Field validate>
                <label>Email</label>
                <input 
                  type="text"
                  name="email"
                  placeholder='Email' 
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <p style={{ color: "orange" }}> {formik.errors.email}</p>
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field validate>
                <label>Start Date</label>
                <DatePicker
                  name="start_date"
                  selected={formik.values.start_date}
                  onChange={(start_date) => formik.setFieldValue('start_date', start_date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Start Date"
                />
                <p style={{ color: "orange" }}> {formik.errors.start_date}</p>
              </Form.Field>
              <Form.Field validate>
                <label>End Date</label>
                <DatePicker
                  name="end_date"
                  selected={formik.values.end_date}
                  onChange={(end_date) => formik.setFieldValue('end_date', end_date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="End Date"
                />
                <p style={{ color: "orange" }}> {formik.errors.end_date}</p>
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field validate>
                <label>Rent</label>
                    <input 
                      type="number"
                      name="rent"
                      placeholder='Rent' 
                      value={formik.values.rent}
                      onChange={formik.handleChange}
                    />
                    <p style={{ color: "orange" }}> {formik.errors.rent}</p>
                </Form.Field>
                <Form.Field validate>
                  <label>Deposit</label>
                    <input 
                      type="number"
                      name="deposit"
                      placeholder='Deposit' 
                      value={formik.values.deposit}
                      onChange={formik.handleChange}
                    />
                  <p style={{ color: "orange" }}> {formik.errors.deposit}</p>
                </Form.Field>
                <Form.Field validate>
                  <label>Unit ID</label>
                  <input 
                    type="number"
                    name="unit_id"
                    placeholder='Unit ID' 
                    value={formik.values.unit_id}
                    onChange={formik.handleChange}
                  />
                  <p style={{ color: "orange" }}> {formik.errors.unit_id}</p>
                </Form.Field>
            </Form.Group>
            <Button type='submit' onClick={formik.handleSubmit}>Submit</Button>
        </Form>
    </div>
  )
}

export default NewLease
