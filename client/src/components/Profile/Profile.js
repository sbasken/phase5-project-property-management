import { Container, Image, Reveal, Card, Icon} from 'semantic-ui-react'
import RingLoader from 'react-spinners/RingLoader'
import { useGetUsersQuery } from '../../app/services/usersAPI'

const Profile = () => {
  const { data: user = [], isLoading, isError, error } = useGetUsersQuery()
  console.log(user)
  const joinedYear = new Date(user.created_at).getFullYear()

  if (isError) {
    <div>{error.toString()}</div>
  }

  return (
    <div>
      <RingLoader color={'#F5A623'} loading={isLoading}/>
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
            <Card.Header>{user.username}</Card.Header>
            <Card.Meta>
              <Icon name='user'/> {user.type}
            </Card.Meta>
            <Card.Description>
              <Icon name='calendar'/>
                Joined in {joinedYear}
              <br></br>
              <Icon name='mail'/>
              {user.email}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name='building' />
            {user.properties.length } Properties
          </Card.Content>
        </Card>
      </Container>
    </div>
  )
}

export default Profile