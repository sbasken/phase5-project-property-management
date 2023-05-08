import { Container, Image, Reveal, Card, Icon} from 'semantic-ui-react'

const Profile = ({ currentUser }) => {
    const joinedYear = new Date(currentUser.created_at).getFullYear()
    console.log('in profile:', currentUser)

    return (
        <div>
            <Container className='hidden divider' >
                <Card>
                <Reveal animated='move down'>
                    <Reveal.Content visible>
                        <Image src='https://vectips.com/wp-content/uploads/2019/11/tutorial-preview-large.png' />
                    </Reveal.Content>
                    <Reveal.Content hidden>
                        <Image src='https://media.istockphoto.com/id/516446406/photo/cute-panda-bear-climbing-in-tree.jpg?s=170667a&w=0&k=20&c=tO-WVSfq4xopuZ7JfU4_YZ3b10XthzmxG-a4aEmg-hA=' />
                    </Reveal.Content>
                    </Reveal>
                <Card.Content>
                    <Card.Header>{currentUser? currentUser.username : 'username'}</Card.Header>
                    <Card.Meta>
                    <Icon name='user'/> {currentUser? currentUser.type : 'type'}
                    </Card.Meta>
                    <Card.Description>
                    <Icon name='calendar'/>
                    {currentUser.type === 'owner' ? `Happy Panda since ${joinedYear} 🐼`: `Agent Panda since ${joinedYear} 🐼`}
                    <br></br>
                    <Icon name='mail'/>
                    {currentUser? currentUser.email : 'email'}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='building' />
                    { currentUser? currentUser.properties.length : 0 } Properties
                </Card.Content>
                </Card>
            </Container>
        </div>
    )
}

export default Profile