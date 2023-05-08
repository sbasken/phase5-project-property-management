import { useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import { Grid, Button, Icon, Table, Image, Confirm } from 'semantic-ui-react'
import { useGetLeasesQuery, useDeleteLeaseMutation } from '../../../app/services/leasesAPI'
import RingLoader from 'react-spinners/RingLoader'

const Lease = () => {
    const { data: leases = [], isLoading, isError, error } = useGetLeasesQuery()
    const { id, unitid } = useParams()
    const leaseToDisplay = leases.filter(lease => lease.unit_id === parseInt(unitid))
    const [ deleteLease ] = useDeleteLeaseMutation()
    const [ open, setOpen ] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleDeleteClick() {
        handleOpen();
    }

    function handleConfirm() {
        deleteLease(leaseToDisplay[0].id)
        handleClose();
    }

    function handleCancel() {
        handleClose();
    }


    if (isError) {
        return <div>Error: {error.message}</div>
    }

    if (leaseToDisplay.length === 0) {
        return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>You have no lease for this unit yet.</h1>
            <Button 
                basic color='orange' content='Orange'
                animated='fade' 
                as={Link} 
                to={`/properties/${id}/units/${unitid}/lease/add-new`}
            >
                <Button.Content visible>New Lease</Button.Content>
                <Button.Content hidden>
                    <Icon name='user plus'/>
                    <Icon name='clipboard'/>
                </Button.Content>
            </Button>
        <br></br>
        <div style={{ width: '50rem', height: '30rem', position: 'relative', overflow: 'hidden' }}>
            <Image fluid style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80' alt='lease agreement'/>
        </div>
        </div>
    )}

    return (
        <div>
            <RingLoader color={'#F5A623'} loading={isLoading} />
            <div className='ui container hidden divider'>
                <Grid stackable>
                    <Grid.Column width={3} >
                        <Button 
                            basic color='orange' content='Orange'
                            animated='fade' 
                            as={Link} 
                            to={`/properties/${id}/units`}
                        >
                            <Button.Content visible>Go Back</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow left'/>
                            </Button.Content>
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Button.Group color='teal' floated='right' style={{ marginBottom: '10px'}}>
                        <Button animated='fade' as={Link} to={`/properties/${id}/units/${unitid}/lease/${leaseToDisplay[0].id}/${leaseToDisplay[0].tenant_id}`}>
                            <Button.Content visible>Edit</Button.Content>
                            <Button.Content hidden>
                                <Icon name='edit'/>
                            </Button.Content>
                        </Button>
                        <Button animated='fade' onClick={handleDeleteClick}>
                            <Button.Content visible>Delete</Button.Content>
                            <Button.Content hidden>
                                <Icon name='trash'/>
                            </Button.Content>
                        </Button>
                        <Confirm
                            open={open}
                            onCancel={handleCancel}
                            onConfirm={handleConfirm}
                        />
                        </Button.Group>
                        <Table color='teal' textAlign='left'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Lease Information for lease #{leaseToDisplay[0].id}</Table.HeaderCell>
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
                            </Table.Body>
                        </Table>
                    
                    </Grid.Column>
                </Grid>
            </div>
        </div>
    )
}

export default Lease