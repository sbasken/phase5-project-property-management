import React from 'react'
import GenerateTable from './GenerateTable'
import { Grid, Menu, Button, Pagination } from 'semantic-ui-react'

const ExpensePage = () => {
  return (
    <div className='ui container hidden divider'>
        <Grid stackable>
            <Grid.Column width={3} >
                <Menu fluid vertical tabular>
                    <Menu.Item
                        name='All'
                        value='all'
                    />
                    <Menu.Item
                        name='Property 1'
                        value='property 1'
                    />
                    <Menu.Item
                        name='Property 2'
                        value='property 2'
                    />
                </Menu>
            </Grid.Column>
            <Grid.Column width={13}>
                <h1>Property 1</h1>
                <GenerateTable />
                <Pagination defaultActivePage={1} totalPages={5} />
            </Grid.Column>

        </Grid>
    </div>
  )
}

export default ExpensePage