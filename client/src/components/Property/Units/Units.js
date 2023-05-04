import React from 'react'
import UnitCard from './UnitCard'
import { Grid, Button, Icon, Image } from 'semantic-ui-react'
import { Link, useParams } from 'react-router-dom'
import { useGetUnitsQuery } from '../../../app/services/unitsAPI'
import RingLoader from 'react-spinners/RingLoader'
import { css } from '@emotion/react'

const Units = () => {
  const { id } = useParams();
  const { data: units = [], isLoading } = useGetUnitsQuery(id)
  // isLoading, isSuccess, isError, error
  // console.log(property)
  // console.log(units)
  // console.log(id)

  const noUnitsYetMessage = (
    // <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>You have no units for this property yet.</h1>
      <Button animated='fade' as={Link} to={`/properties/${id}/units/add-new`}>
        <Button.Content visible>Add Unit</Button.Content>
        <Button.Content hidden>
          <Link to={`/properties/${id}/units/add-new`}>
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
      <RingLoader color={'#F5A623'} loading={isLoading} />
    
      { units && units.length > 0 ? 
      <>
        <Grid Columns={3} stackable>
          <Grid.Column width={2}>
            <Button 
              animated='fade' 
              as={Link} 
              to={`/properties/${id}/units/add-new`}
              style={{ marginTop: '10px' }}
            >
              <Button.Content visible>Add More</Button.Content>
              <Button.Content hidden>
                <Icon name='key' />
              </Button.Content>
            </Button>
              
            <Button animated='fade' style={{ marginTop: '10px' }}>
              <Button.Content visible>Notify All</Button.Content>
              <Button.Content hidden>
                <Icon name='mail' />
              </Button.Content>
            </Button>
            <Button 
              animated='fade' 
              as={Link} 
              to={'/properties'}
              style={{ marginTop: '10px' }}
            >
              <Button.Content visible>Go Back</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow left'/>
              </Button.Content>
            </Button>
          </Grid.Column>
            { units.map(unit => <UnitCard key={unit.id} unit={unit}/>) }
        </Grid>
      </> : (noUnitsYetMessage)}
    </div>
  )
}

export default Units