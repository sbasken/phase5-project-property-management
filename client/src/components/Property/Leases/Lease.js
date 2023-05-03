import { useParams, Link } from 'react-router-dom'
import { Grid, Button, Icon, Table } from 'semantic-ui-react'

const Lease = () => {
    const { id, unitid} = useParams()
    console.log(id, unitid)

    return (
        <div className='ui container hidden divider'>
            <Grid stackable>
                <Grid.Column width={3} >
                    <Button animated='fade' as={Link} to={`/properties/${id}/units`}>
                        <Button.Content visible>Go Back</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow left'/>
                        </Button.Content>
                    </Button>
                    <Button animated='fade' as={Link} to={`/properties/${id}/units/${unitid}/lease/add-new`}>
                        <Button.Content visible>New Lease</Button.Content>
                        <Button.Content hidden>
                            <Icon name='user plus'/>
                        </Button.Content>
                    </Button>
                </Grid.Column>
                <Grid.Column width={13}>
                <Table color='teal' textAlign='left'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Lease Information</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Row>
                            <Table.Cell>Start Date</Table.Cell>
                            <Table.Cell>6/1/2022</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>End Date</Table.Cell>
                            <Table.Cell>5/30/2023</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Rent</Table.Cell>
                            <Table.Cell>$1700</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Deposit</Table.Cell>
                            <Table.Cell>$1500</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Unit ID</Table.Cell>
                            <Table.Cell>A1</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Table color='pink' >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Tenant Information</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Name</Table.Cell>
                            <Table.Cell>David B</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Phone Number</Table.Cell>
                            <Table.Cell>123-123-1234</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Email Address</Table.Cell>
                            <Table.Cell>example@example.com</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Created At</Table.Cell>
                            <Table.Cell>5/27/2022</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Lease