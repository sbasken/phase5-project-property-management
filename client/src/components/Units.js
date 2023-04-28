import React from 'react'
import UnitCard from './UnitCard'
import { Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Units = () => {
  return (
    <div className='ui container hidden divider'>
      <Grid Columns={3} stackable>
        <Grid.Column computer={7} tablet={16} mobile={16}>
          <UnitCard />
        </Grid.Column>
        <Grid.Column computer={7} tablet={16} mobile={16}>
          <UnitCard />
        </Grid.Column>
        <Grid.Column>
          <Button computer={2} as={Link} to='/newUnit'>
            Add More
          </Button>
        </Grid.Column>

        
      </Grid>
    </div>
  )
}

export default Units