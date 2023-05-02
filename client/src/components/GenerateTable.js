import { Link } from 'react-router-dom'
import { Table, Icon, Button } from 'semantic-ui-react';
import { useGetExpensesQuery } from '../app/services/expensesAPI';

const GenerateTable = () => {
    const { data: expenses = [], isLoading } = useGetExpensesQuery();
    console.log(expenses)

    const tableRow = expenses.map(expense => {
        const expenseDate = new Date(expense.date);
        return (
            <Table.Row>
                <Table.Cell>{expenseDate.toLocaleDateString()}</Table.Cell>
                <Table.Cell>{expense.expense_type}</Table.Cell>
                <Table.Cell>{expense.amount}</Table.Cell>
                <Table.Cell>{expense.unit_id ? expense.unit_id : 'BLDG'}</Table.Cell>
                <Table.Cell>{expense.property_id}</Table.Cell>
                <Table.Cell textAlign='right'>
                    <Icon name='edit' size='large'></Icon>
                    <Icon name='trash alternate' size='large'></Icon>
                </Table.Cell>
            </Table.Row>
        );
    });

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
                <Table.HeaderCell>Property ID</Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>
                    <Button as={Link} to={'/expense/add-new'}>
                       ＋
                    </Button>
                    
                </Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>
                {tableRow}
            </Table.Body>
        </Table>
    </div>
  )
}

export default GenerateTable