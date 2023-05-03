import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Table, Icon } from 'semantic-ui-react'
import { useGetExpensesQuery } from '../../app/services/expensesAPI';

import { useGetPropertyQuery } from '../../app/services/propertiesAPI'

const GenerateReport = () => {
  const { id } = useParams()
  const { data: property = [], isLoading, isSuccess, isError, error } = useGetPropertyQuery(id)
  // console.log(property)

  const { data: expenses = [] } = useGetExpensesQuery();
  const [ filteredExpenses, setFilteredExpenses ] = useState([])

  useEffect(() => {
    const filteredList = expenses.filter(expense => expense.property_id === property.id);
    setFilteredExpenses(filteredList);
  }, [expenses, property.id]);

  // Group expenses by expense_type and calculate the total amount for each group
  const expenseTypeGroups = filteredExpenses.reduce((groups, expense) => {
    const expenseType = expense.expense_type;
    const amount = expense.amount;
    const unit_id = expense.unit_id
    if ((unit_id === null || unit_id === 0) && (!groups[expenseType] || !groups[expenseType + ': BLDG'])) {
        groups[expenseType + ': BLDG'] = { expense_type: expenseType + ': BLDG', total_amount: 0 };
    }
    if (!groups[expenseType]) {
      groups[expenseType] = { expense_type: expenseType, total_amount: 0 };
    }
    if ( unit_id === null || unit_id === 0 ){
    groups[expenseType + ': BLDG'].total_amount += amount;
    } else {
        groups[expenseType].total_amount += amount;
    }
    return groups;
  }, {});

  let totalAmount = 0;

  for (let group in expenseTypeGroups) {
    totalAmount += expenseTypeGroups[group].total_amount;
  }

  // Create an array with one row per expense_type and the corresponding total amount
  const tableRows = Object.values(expenseTypeGroups).map(group => {
    return (
      <Table.Row key={group.expense_type}>
        <Table.Cell></Table.Cell>
        <Table.Cell>{group.expense_type}</Table.Cell>
        <Table.Cell>${group.total_amount}</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
      </Table.Row>
    );
  });

  return (
    <div className='ui container hidden divider'>
      <h1>Summary Report for {property.nickname}</h1>
      <Table columns={5} unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Unit ID</Table.HeaderCell>
            <Table.HeaderCell>Property ID</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableRows}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>
                Total <Icon floated='right' name='arrow alternate circle right'/>
              </Table.HeaderCell>
              <Table.HeaderCell>${totalAmount}</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell />
          </Table.Row>
            </Table.Footer>
      </Table>
    </div>
  )
}

export default GenerateReport
