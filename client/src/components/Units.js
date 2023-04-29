import React from 'react'
import UnitCard from './UnitCard'
import { Grid, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Units = () => {
  return (
    <div className='ui container hidden divider'>
      <Grid Columns={2} stackable>
        <Grid.Column computer={6} tablet={16} mobile={16}>
          <UnitCard />
        </Grid.Column>
        <Grid.Column computer={6} tablet={16} mobile={16}>
          <UnitCard />
        </Grid.Column>
      </Grid>
      <div className='ui row hidden divider'>
        <Button animated='fade'>
          <Button.Content visible>Add More</Button.Content>
          <Button.Content hidden>
            <Icon name='key' />
          </Button.Content>
        </Button>

        <Button animated='fade'>
          <Button.Content visible>Notify All Tenants</Button.Content>
          <Button.Content hidden>
            <Icon name='mail' />
          </Button.Content>
        </Button>
    </div>
  </div>
  )
}

export default Units