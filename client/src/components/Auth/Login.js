import React from 'react'
import RingLoader from 'react-spinners/RingLoader';
import * as yup from "yup";
import { Grid, Form, Button } from 'semantic-ui-react'
import { useFormik } from "formik";
import { useNavigate, Link } from 'react-router-dom';
import { useLoginUserMutation } from '../../app/services/authAPI';

const Login = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [ loginUser, { isLoading } ] = useLoginUserMutation();

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
    onSubmit: async (values) => {
      if (formik.isValid) {
        try {
          const { data } = await loginUser(values)
          setCurrentUser(data)
          navigate('/')
        } catch (error) {
          alert('Oops, username and password don\'t match');
        }
      }
    }
  });

  return (
    <div>
      <RingLoader color={'#F5A623'} loading={isLoading}/>
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
    </div>
  )
}

export default Login