import { Link } from 'react-router-dom'
import GenerateReport from './GenerateReport'
import Dropdown from './Dropdown'
import { Grid, Button, Icon } from 'semantic-ui-react'

const ReportPage = () => {
    
    return (
    <div className='ui container hidden divider'>
        <Grid stackable>
            <Grid.Column width={3} >
                    <Dropdown />
                    <Button animated='fade' as={Link} to='/expenses' style={{ marginTop: '4px' }}>
                        <Button.Content visible>Go Back</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow left'/>
                        </Button.Content>
                    </Button>
            </Grid.Column>
            <Grid.Column width={13}>
                <GenerateReport />
            </Grid.Column>
        </Grid>
    </div>
    )
}

export default ReportPage