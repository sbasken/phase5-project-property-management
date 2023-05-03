import { Grid, Container } from 'semantic-ui-react'
import Contact from './ContactUs'
import './about.css'

const About = () => {

    return (
        <Container className='hidden divider'>
            <Grid columns={2} textAlign='center' >
                <Grid.Column>
                <h3>Location</h3>
                <p>777 Flatiron St.</p>
                <p>Seattle, WA 98100</p>
                <h2>Phone Number</h2>
                <p>☎ 123-456-7890</p>
                </Grid.Column>
                <Grid.Column textAlign='center'>
                    <Contact style={{ margin: 'auto', padding: '5%' }}    />
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default About