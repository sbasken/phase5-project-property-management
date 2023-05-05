import React, { useState } from 'react'
import GenerateTable from './GenerateTable'
import { Link } from 'react-router-dom'
import { Grid, Menu, Button, Icon } from 'semantic-ui-react'
import { useGetPropertiesQuery } from '../../app/services/propertiesAPI'

const ExpensePage = () => {
    const { data: properties = [], isLoading, isError, error } = useGetPropertiesQuery()
    const [ category, setCategory ] = useState(null)

    function handleClick(e, { value }) {
        setCategory(value);
    }

    if (isLoading) {
        <div>Loading</div>
    }
    if (isError) {
        <div>{error.toString()}</div>
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
                { category ? <>
                <Button animated='fade' as={Link} to={`/expenses/reports/${category}`}>
                    <Button.Content visible>Generate Report</Button.Content>
                    <Button.Content hidden>
                        <Icon name='clipboard list'/>
                    </Button.Content>
                </Button></> : null}
            </Grid.Column>
            <Grid.Column width={13}>
                <Grid.Column>
                    <GenerateTable category={category}/>
                </Grid.Column>
            </Grid.Column>
        </Grid>
    </div>

  )
}

export default ExpensePage