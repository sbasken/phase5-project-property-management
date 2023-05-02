import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GenerateTable from './GenerateTable'
import { Grid, Menu, Button, Icon } from 'semantic-ui-react'


import { useGetPropertiesQuery } from '../app/services/propertiesAPI'

const ExpensePage = () => {
    const { data: properties = [], isLoading, isSuccess, isError, error } = useGetPropertiesQuery()
    const [ category, setCategory ] = useState(null)

    function handleClick(e, { value }) {
        setCategory(value);
      }

    const menu_items = properties.map(property => {
        return (
        <Menu.Item
            key={property.id}
            name={`ID: ${property.id}, ${property.nickname}`}
            value={property.id}
            onClick={handleClick}
        />
        )
    })

  return (
    <div className='ui container hidden divider'>
        <Grid stackable>
            <Grid.Column width={3} >
                <Menu fluid vertical tabular>
                    <Menu.Item
                        name='All'
                        value={null}
                        onClick={handleClick}
                    />
                    {menu_items}
                </Menu>
                { category? <>
                <Button animated='fade'>
                    <Button.Content visible>Generate Report</Button.Content>
                    <Button.Content hidden>
                    <Link to='/properties/:id/units/add-new'>
                        <Icon name='clipboard list'/>
                    </Link>
                    </Button.Content>
                </Button></> : null}
            </Grid.Column>
            <Grid.Column width={13}>
                <GenerateTable category={category}/>
            </Grid.Column>

        </Grid>
    </div>
  )
}

export default ExpensePage