import React, { useState } from 'react'
import GenerateTable from './GenerateTable'
import { Link } from 'react-router-dom'
import { Grid, Menu, Button, Icon, Image } from 'semantic-ui-react'
import { useGetPropertiesQuery } from '../../app/services/propertiesAPI'

const ExpensePage = () => {
    const { data: properties = [], isLoading, isError, error } = useGetPropertiesQuery()
    const [ category, setCategory ] = useState(null)
    console.log(properties)

    function handleClick(e, { value }) {
        setCategory(value);
    }

    if (isLoading) {
        <div>Loading</div>
    }
    if (isError) {
        <div>{error.toString()}</div>
    }

    let menu_items
    if (properties && properties.length > 0) {
        menu_items = properties.map(property => {
        return (
        <Menu.Item
            key={property.id}
            name={`ID: ${property.id}, ${property.nickname}`}
            value={property.id}
            onClick={handleClick}
        />
        )
    })
    }

    const noExpensessYetMessage = (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>You have no Expenses yet.</h1>
            { properties.length > 0 ?
            <Button as={Link} to='/expenses/add-new'>
                Add New
            </Button> : <>
            <p>or properties.</p>
            <p> 🐾 Please Add property first 🐾</p>
            <Button as={Link} to='/properties'>
                Go to Property Page
            </Button>
            </>}
        <br></br>
        <div style={{ width: '50rem', height: '30rem', position: 'relative', overflow: 'hidden' }}>
            <Image fluid style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80' alt='expense report'/>
        </div>
        </div>
    )

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
                    { properties && properties.length > 0 ? menu_items : null}
                </Menu>
                { category ? <>
                <Button animated='fade' as={Link} to={`/expenses/reports/${category}`}>
                    <Button.Content visible>Generate Report</Button.Content>
                    <Button.Content hidden>
                        <Icon name='clipboard list'/>
                    </Button.Content>
                </Button> </> : null}
            </Grid.Column>
            <Grid.Column width={13}>
                <Grid.Column>
                    { properties && properties.length > 0 ? <GenerateTable category={category}/> : noExpensessYetMessage}
                </Grid.Column>
            </Grid.Column>
        </Grid>
    </div>

  )
}

export default ExpensePage