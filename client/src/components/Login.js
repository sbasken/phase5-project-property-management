import React from 'react'
import { Grid, Form, Button } from 'semantic-ui-react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from 'react-router-dom';
import { setCurrentUser } from '../features/currentUser/currentUserSlice';

const Login = () => {
  
  console.log(setCurrentUser)
  const navigate = useNavigate();

  const formSchema = yup.object({
      username: yup.string().required('Field required'),
      password: yup.string().required('Field required'),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(res => {
        if (res.ok) {
            res.json().then(
              (user) => {
                setCurrentUser(user)
                navigate('/home')}
            ) 
        } else {
        alert('Oops, username and password don\'t match');
        }
      })
    }
  })

  return (
    <div className='ui container hidden divider'>
      <Grid >
        <Grid.Column >
          <Form onSubmit={formik.handleSubmit}>
          <h1>Hi again! Please log in below</h1>
          <br/>
            <Form.Field >
              <label>Username:</label>
              <Form.Input
                name="username"
                type="text"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              <p style={{ color: "orange" }}> {formik.errors.username}</p>
            </Form.Field>
            <br/>
            <Form.Field>
              <label>Password:</label> 
              <Form.Input
                name="password"
                type="password"
                placeholder="Password"
                value={formik.values.password} 
                onChange={formik.handleChange}
              />
              <p style={{ color: "orange" }}> {formik.errors.password}</p>
              </Form.Field>
              <br/>
              <Button 
              className='ui button' 
              type='submit'>Log In</Button>
              <br/>
          </Form>
        </Grid.Column>
      </Grid>
        <h4 style={{textAlign:'center'}}>No a panda yet? Sign up <Link to="/signup">here</Link></h4>
    </div>
  )
}

export default Login