import { useParams, Link } from 'react-router-dom'
import { Grid, Button, Icon, Table, Image } from 'semantic-ui-react'
import { useGetLeasesQuery } from '../../../app/services/leasesAPI'

const Lease = () => {
    const { data: leases = [], isLoading: leasesIsLoading, isSuccess: leasesIsSuccess, isError: leasesIsError, error: leasesError } = useGetLeasesQuery()
    const { id, unitid } = useParams()
    const leaseToDisplay = leases.filter(lease => lease.unit_id === parseInt(unitid))

    if (leasesIsLoading ) {
        return <div>Loading...</div>
    }

    if (leasesIsError) {
        return <div>Error: {leasesError.message}</div>
    }
    // if ( tenantIsError) {
    //     return <div>Error: {tenantError.message}</div>
    // }
    if (leaseToDisplay.length === 0) {
        return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>You have no lease for this unit yet.</h1>
            <Button animated='fade' as={Link} to={`/properties/${id}/units/${unitid}/lease/add-new`}>
                <Button.Content visible>New Lease</Button.Content>
                <Button.Content hidden>
                    <Icon name='user plus'/>
                    <Icon name='clipboard'/>
                </Button.Content>
            </Button>
        <br></br>
        <div style={{ width: '50rem', height: '30rem', position: 'relative', overflow: 'hidden' }}>
            <Image fluid style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='https://images.unsplash.com/photo-1560706834-afe1ba5d6737?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80' alt='building entrance'/>
        </div>
        </div>
    )}

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
                </Grid.Column>
                <Grid.Column width={13}>
                <Table color='teal' textAlign='left'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Lease Information</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Row>
                            <Table.Cell>Start Date</Table.Cell>
                            <Table.Cell>{leaseToDisplay[0].start_date}</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>End Date</Table.Cell>
                            <Table.Cell>{leaseToDisplay[0].end_date}</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Rent</Table.Cell>
                            <Table.Cell>{leaseToDisplay[0].rent}</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Deposit</Table.Cell>
                            <Table.Cell>{leaseToDisplay[0].deposit}</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Unit ID</Table.Cell>
                            <Table.Cell>{leaseToDisplay[0].unit_id}</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Tenant ID</Table.Cell>
                            <Table.Cell>{leaseToDisplay[0].tenant_id}</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
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
                            <Table.Cell>{leaseToDisplay[0].tenant.name}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Phone Number</Table.Cell>
                            <Table.Cell>{leaseToDisplay[0].tenant.phone_number}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Email Address</Table.Cell>
                            <Table.Cell>{leaseToDisplay[0].tenant.email}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Created At</Table.Cell>
                            <Table.Cell>{leaseToDisplay[0].tenant.created_at}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Lease