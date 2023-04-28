import { Table, Icon } from 'semantic-ui-react';

const GenerateTable = () => {
  return (
    <Table columns={5} unstackable>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Unit_id</Table.HeaderCell>
            <Table.HeaderCell textAlign='right'>
                <Icon name='plus square outline' size='large'></Icon>
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
        <Table.Row>
        <Table.Cell>4/25/2023</Table.Cell>
            <Table.Cell>Landscaping</Table.Cell>
            <Table.Cell>$110</Table.Cell>
            <Table.Cell>BLDG</Table.Cell>
            <Table.Cell textAlign='right'>
                <Icon name='edit' size='large'></Icon>
                <Icon name='trash alternate' size='large'></Icon>
            </Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>4/25/2023</Table.Cell>
            <Table.Cell>Repair</Table.Cell>
            <Table.Cell>$280</Table.Cell>
            <Table.Cell>A2</Table.Cell>
            <Table.Cell textAlign='right'>
                <Icon name='edit' size='large'></Icon>
                <Icon name='trash alternate' size='large'></Icon>
            </Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>4/25/2023</Table.Cell>
            <Table.Cell>Management Fees</Table.Cell>
            <Table.Cell>$550</Table.Cell>
            <Table.Cell>BLDG</Table.Cell>
            <Table.Cell textAlign='right'>
                <Icon name='edit' size='large'></Icon>
                <Icon name='trash alternate' size='large'></Icon>
            </Table.Cell>
        </Table.Row>
        </Table.Body>

        <Table.Footer>
        <Table.Row>
            <Table.HeaderCell>3 items</Table.HeaderCell>
            <Table.HeaderCell>2 repairs</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
        </Table.Row>
        </Table.Footer>
    </Table>
  )
}

export default GenerateTable