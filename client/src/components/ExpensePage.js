import React from 'react'
import GenerateTable from './GenerateTable'
import { Grid, Menu } from 'semantic-ui-react'

import { useGetPropertiesQuery } from '../app/services/propertiesAPI'

const ExpensePage = () => {
    const { data: properties = [], isLoading, isSuccess, isError, error } = useGetPropertiesQuery()
    const menu_items = properties.map(property => {
        return (
        <Menu.Item
            key={property.id}
            name={property.nickname}
            value={property.nickname}
        />
        )
    })

  return (
    <div className='ui container hidden divider'>
        <Grid stackable>
            <Grid.Column width={3} >
                <Menu fluid vertical tabular>
                    {menu_items}
                </Menu>
            </Grid.Column>
            <Grid.Column width={13}>
                <GenerateTable />
            </Grid.Column>

        </Grid>
    </div>
  )
}

export default ExpensePage