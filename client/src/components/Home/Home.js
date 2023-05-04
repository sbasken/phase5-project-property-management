import banner from './banner.png'
import { Image, Grid } from 'semantic-ui-react'


const Home = () => {
  return (
    <>
      <Image src={banner} />
      <Grid 
        columns={2} 
        textAlign='center' 
        className='hidden divider' 
        stackable
        style={{ margin: '1.5rem' }}
      >
        <Grid.Column style={{ paddingLeft:'2px'}}>
          <br></br>
          <h2> We work hard while you sleep like a panda</h2>
          <p>We understand that managing properties can be overwhelming.</p> 
          <p>Which is why we've created a user-friendly platform to simplify the process. </p>
          <p>Our application allows you to easily track and manage expenses, income, and lease information all in one place. </p>
          <p>With powerful tools and analytics, you can make informed decisions that will help maximize your profits and minimize your expenses. </p>
          <p>Whether you're a property owner, manager, or investor, our application is designed to streamline your operations and help you succeed.</p>
          <p> Join our community today and start managing your properties like a pro!</p>
        </Grid.Column>
        <Grid.Column >
          <Image 
              className='about_panda'
              src='https://images.unsplash.com/photo-1593526492327-b071f3d5333e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80' 
              style={{ maxHeight: '25rem', marginTop: '2rem', margin: 'auto' }}    
          />
        </Grid.Column>
      </Grid>
    </>
    
  )
}

export default Home

