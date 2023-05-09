import { Grid, Container, List, Image } from 'semantic-ui-react'
import Contact from './ContactUs'
import './about.css'

const About = () => {

    return (
        <Container className='hidden divider'>
            <Grid columns={2} textAlign='center' stackable >
                <Grid.Column>
                    <Image style={{ maxHeight: '25rem', margin: 'auto' }} src='https://images.unsplash.com/photo-1625859043880-56acbcb6a6ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'/>
                    <List>
                        <List.Item>
                        <List.Icon name='users' />
                        <List.Content>Property Panda</List.Content>
                        </List.Item>
                        <List.Item>
                        <List.Icon name='marker' />
                        <List.Content>Seattle, WA</List.Content>
                        </List.Item>
                        <List.Item>
                        <List.Icon name='mail' />
                        <List.Content>
                            <a href='mailto:hello@seattlepanda.com'>hello@seattlepanda.com</a>
                        </List.Content>
                        </List.Item>
                        <List.Item>
                        <List.Icon name='linkify' />
                        <List.Content>
                            <a href='http://www.semantic-ui.com'>propertypanda.com</a>
                        </List.Content>
                        </List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column textAlign='center'>
                    <Contact style={{ margin: 'auto', padding: '5%' }}    />
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default About