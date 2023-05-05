import React from 'react'
import DatePicker from 'react-datepicker';

import { Button, Form } from 'semantic-ui-react'
import { useAddExpenseMutation } from '../../app/services/expensesAPI';
import { useGetPropertiesQuery } from '../../app/services/propertiesAPI';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom'

import * as yup from "yup";
import 'react-datepicker/dist/react-datepicker.css';

const NewExpense = () => {
    const [ addExpense, isLoading, isError, error ] = useAddExpenseMutation()
    const { data: properties = [] } = useGetPropertiesQuery()
    let units 
    if (properties.length > 0) {
        units = properties.map( property => property.units)
    }
    console.log('NewExpense: units', units)
    const navigate = useNavigate();

    if (isLoading) {
        <h1>Loading...</h1>
    }  else if (isError) {
        <div>{error.toString()}</div>
    }

    const propertyOptions = properties?.map(property => ({
        key: `${property.nickname} BLDG`,
        text: `${property.nickname} BLDG`,
        value: `${property.id}`
    }));

    const unitOptions = units[0]?.map(unit => ({
    key: `${unit.unit_number}`,
    text: `${unit.unit_number}`,
    value: `${unit.id}`
    }));


    const formSchema = yup.object().shape({
        date: yup.date()
            .required('Required'),
        expense_type: yup.string()
            .required('Required'),
        amount: yup.number()
            .required('Required'),
        property_id: yup.number()
            .required('Required'),
        unit_id: yup.number()
            .required('Required')
      })

    const formik = useFormik({
        initialValues: {
            date: '',
            expense_type: '',
            amount: 0,
            property_id: null,
            unit_id: null
        },
        validationScheme: formSchema,
        onSubmit: (values) => {
            console.log(values)
            console.log("Creating a new expense item...")
            if (formik.isValid) {
                addExpense(values)
                console.log("Expense item successfully created!")
                navigate('/expenses')
            }
        }
    })

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

  return (
    <div className='ui container hidden divider'>
        <h1>New Expense Info</h1>
        <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <Form.Group widths='equal'>
            <Form.Field validate>
                <label>Date</label>
                <DatePicker
                    name="date"
                    selected={formik.values.date}
                    onChange={(date) => formik.setFieldValue('date', date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Date"
                />
                <p style={{ color: 'orange' }}> {formik.errors.date}</p>
                </Form.Field>
                <Form.Field validate>
                    <label>Expense/Income Type</label>
                    <input 
                        type="text"
                        name="expense_type"
                        placeholder='Type' 
                        value={formik.values.expense_type}
                        onChange={formik.handleChange}
                    />
                    <p style={{ color: "orange" }}> {formik.errors.expense_type}</p>
                </Form.Field>
                <Form.Field validate>
                    <label>Amount</label>
                    <input 
                        type="number"
                        name="amount"
                        placeholder='Amount' 
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                    />
                    <p>Don't forget to put '-' for expenses 🐼</p>
                    <p style={{ color: "orange" }}> {formik.errors.amount}</p>
                </Form.Field>
            </Form.Group>
            <Form.Field validate>
                <label>Property</label>
                <select 
                    type="number"
                    name="property_id"
                    placeholder='Property ID' 
                    value={formik.values.property_id}
                    onChange={formik.handleChange}
                >
                    <option value=''>Select a property</option>
                        {propertyOptions?.map((propertyOption) => (
                            <option key={propertyOption.key} value={propertyOption.value}>
                                {propertyOption.text}
                            </option>
                        ))}
                </select>
                <p style={{ color: "orange" }}> {formik.errors.property_id}</p>
            </Form.Field>
            <Form.Field validate>
                <label>Unit</label>
                <select 
                    type="number"
                    name="unit_id"
                    placeholder='Unite ID' 
                    value={formik.values.unit_id}
                    onChange={formik.handleChange}
                >
                    <option value=''>Select a unit</option>
                        {unitOptions?.map((unitOption) => (
                            <option key={unitOption.key} value={unitOption.value}>
                                {unitOption.text}
                            </option>
                        ))}
                </select>
                <p style={{ color: "orange" }}> {formik.errors.unit_id}</p>
            </Form.Field>
            <Button onClick={formik.handleSubmit} type='submit'>Submit</Button>
        </Form>
    </div>
  )
}

export default NewExpense