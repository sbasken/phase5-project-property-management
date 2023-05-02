import { Link } from 'react-router-dom'
import { Table, Icon, Button } from 'semantic-ui-react';

const GenerateTable = ({ properties }) => {
    const units = properties.map(property => property.units)
    console.log('units', units)
    const expenses = units.map(unit => unit.expenses)
    console.log('expenses', expenses)
    // const expenses = properties.expenses

  return (
    <div className='ui container hidden divider'>
        <h1>Expenses</h1>
        <Table columns={5} unstackable>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Unit ID</Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>
                    <Button as={Link} to={'/expense/add-new'}>
                       ＋
                    </Button>
                    
                </Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>4/25/2023</Table.Cell>
                    <Table.Cell>Repair</Table.Cell>
                    <Table.Cell>$280</Table.Cell>
                    <Table.Cell>A1</Table.Cell>
                    <Table.Cell textAlign='right'>
                    <Icon name='edit' size='large'></Icon>
                    <Icon name='trash alternate' size='large'></Icon>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </div>
  )
}

export default GenerateTable