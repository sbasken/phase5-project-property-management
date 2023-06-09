import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Icon, Button, Confirm } from 'semantic-ui-react';
import { useGetExpensesQuery, useDeleteExpenseMutation } from '../../app/services/expensesAPI';
import RingLoader from 'react-spinners/RingLoader';

const GenerateTable = ({ category }) => {
    const { data: expenses = [], isLoading } = useGetExpensesQuery();
    const [ filteredExpenses, setFilteredExpenses ] = useState([])
    const [ deleteExpense ] = useDeleteExpenseMutation();
    const [ open, setOpen ] = useState(false);
    const [ expenseId, setExpenseId ] = useState(null);

    useEffect(() => {
        const filteredList = expenses.filter(expense => {
          if (category === null) {
            return expense;
          } else {
            return expense.property_id === category;
          }
        });
        setFilteredExpenses(filteredList);
    }, [expenses, category]);

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

    if (isLoading) {
        <div>Loading...</div>
    } 

    const tableRow = filteredExpenses.map(expense => {
        const expenseDate = new Date(expense.date);
        return (
            <Table.Row key={expense.id}>
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
    <div>
        <RingLoader color={'#F5A623'} loading={isLoading} />
        <div className='ui container hidden divider'>
            <h1>Expenses and Income</h1>
            <Table columns={5} unstackable>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Unit ID</Table.HeaderCell>
                    <Table.HeaderCell>Property ID</Table.HeaderCell>
                    <Table.HeaderCell textAlign='right'>
                        <Button as={Link} to='/expenses/add-new' color='teal'>
                        ＋
                        </Button>
                        
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {tableRow.length > 0 ? tableRow : <Table.Cell>None</Table.Cell>}
                </Table.Body>
            </Table>
        </div>
    </div>
  )
}

export default GenerateTable
