import React from 'react'
import UnitCard from './UnitCard'
import { Grid, Button, Icon, Image } from 'semantic-ui-react'
import { Link, useParams } from 'react-router-dom'
import { useGetPropertyQuery } from '../../../app/services/propertiesAPI'

const Units = () => {
  const { id } = useParams();
  const { data: property = [] } = useGetPropertyQuery(id)
  // isLoading, isSuccess, isError, error
  const units = property.units
  // console.log(id)

  const noUnitsYetMessage = (
    // <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>You have no units for this property yet.</h1>
      <Button animated='fade' as={Link} to={`/properties/${id}/units/add-new`}>
        <Button.Content visible>Add Unit</Button.Content>
        <Button.Content hidden>
          <Link to='/properties/:id/units/add-new'>
            <Icon name='key'/>
          </Link>
        </Button.Content>
      </Button>
      <br></br>
      <div style={{ width: '50rem', height: '30rem', position: 'relative', overflow: 'hidden' }}>
        <Image fluid style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='https://plus.unsplash.com/premium_photo-1661778812498-d56d7f09d1fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80' alt='apartment door'/>
      </div>
    </div>
  )

  return (
    <div className='ui container hidden divider'>
    
      { units && units.length > 0 ? 
      <>
        <Grid Columns={2} stackable>
          { units.map(unit => <UnitCard key={unit.id} unit={unit}/>) }
    
          <Grid.Column width={1}>
            <Button animated='fade' as={Link} to={`/properties/${id}/units/add-new`}>
              <Button.Content visible>Add More</Button.Content>
              <Button.Content hidden>
                <Icon name='key' />
              </Button.Content>
            </Button>
              
            <Button animated='fade'>
              <Button.Content visible>Notify All</Button.Content>
              <Button.Content hidden>
                <Icon name='mail' />
              </Button.Content>
            </Button>
          </Grid.Column>
        </Grid>
      </> : (noUnitsYetMessage)}
    </div>
  )
}

export default Units