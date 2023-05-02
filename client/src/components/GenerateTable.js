import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Icon, Button, Confirm } from 'semantic-ui-react';
import { useGetExpensesQuery, useDeleteExpenseMutation } from '../app/services/expensesAPI';

const GenerateTable = () => {
    const { data: expenses = [], isLoading } = useGetExpensesQuery();
    const [ deleteExpense ] = useDeleteExpenseMutation();
    const [ open, setOpen ] = useState(false);
    const [ expenseId, setExpenseId ] = useState(null);

    const handleOpen = (id) => {
        setExpenseId(id);
        setOpen(true);
      };
    const handleClose = () => {
        setExpenseId(null);
        setOpen(false)
    }

    function handleConfirm() {
        deleteExpense(expenseId)
        handleClose();
    }

    function handleCancel() {
        handleClose();
    }

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
                    <Link to={`/expenses/${expense.id}`}>
                        <Icon name='edit' size='large'/>
                    </Link>
                    <Icon 
                        name='trash alternate' 
                        size='large'
                        onClick={() => handleOpen(expense.id)}
                    />
                    <Confirm
                        open={open}
                        onCancel={handleCancel}
                        onConfirm={handleConfirm}
                    />
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
                    <Button as={Link} to={'/expenses/add-new'}>
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
