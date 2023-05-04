import { Container, Image, Reveal, Card, Icon} from 'semantic-ui-react'
import RingLoader from 'react-spinners/RingLoader'
import { useGetUserQuery } from '../../app/services/usersAPI'

const Profile = () => {
  const { data: user = [], isLoading } = useGetUserQuery()

  return (
    <Container className='hidden divider' >
      <RingLoader color={'#F5A623'} loading={isLoading}/>
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
          <Card.Header>Matthew</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name='user' />
          22 Friends
        </Card.Content>
      </Card>
    </Container>
  )
}

export default Profile