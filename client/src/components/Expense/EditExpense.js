import React, { useEffect } from 'react'
import DatePicker from 'react-datepicker';

import { Button, Form } from 'semantic-ui-react'
import { useGetExpenseQuery, useEditExpenseMutation } from '../../app/services/expensesAPI';
import { useGetPropertiesQuery } from '../../app/services/propertiesAPI';
import { useFormik } from "formik";
import { useNavigate, useParams } from 'react-router-dom'

import * as yup from "yup";
import 'react-datepicker/dist/react-datepicker.css';

const EditExpense = () => {
    const [ editExpense ] = useEditExpenseMutation();
    const { data: properties = [] } = useGetPropertiesQuery()
    const units = properties.map( property => property.units)
    // console.log('NewExpense: properties', properties)
    // console.log('NewExpense: units', units[0])
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: expense = [], isSuccess, isLoading, isError, error } = useGetExpenseQuery(id);
    console.log(expense)
    
    const propertyOptions = properties.map(property => ({
        key: `${property.nickname} BLDG`,
        text: `${property.nickname} BLDG`,
        value: `${property.id}`
    }));

    const unitOptions = units[0].map(unit => ({
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
            id: 0,
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
                editExpense(values)
                .then(() => {
                    console.log("Expense successfully updated!")
                    navigate('/expenses')
                })
            }
        }
    })

    console.log(expense.date)
    useEffect(() => {
        if (isSuccess) {
          formik.setValues({
            id: expense.id,
            date: new Date(expense.date),
            expense_type: expense.expense_type,
            amount: expense.amount,
            property_id: expense.property_id,
            unit_id: expense.unit_id
          });
        }
    }, [expense, isSuccess]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }


  return (
    <div className='ui container hidden divider'>
        <h1>New Expense Info</h1>
        <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Expense ID</label>
                    <input 
                        name="id"
                        placeholder='ID' 
                        value={formik.values.id}
                    />
                 </Form.Field>
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
                    <label>Expense Type</label>
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
                        {propertyOptions.map((propertyOption) => (
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
                        {unitOptions.map((unitOption) => (
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

export default EditExpense