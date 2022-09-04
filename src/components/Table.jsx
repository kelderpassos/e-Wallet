import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense, updateExpense } from '../redux/slices/walletSlice';

function Table() {
  const { expenses } = useSelector(({ wallet }) => wallet);
  const dispatch = useDispatch();

  return (
    <div>
      <table>
        <colgroup span="4" />
        <tbody>
          <tr>
            <th>Description</th>
            <th>Tag</th>
            <th>Payment Method</th>
            <th>Value</th>
            <th>Currency</th>
            <th>Selected Currency</th>
            <th>Converted Value</th>
            <th>Conversion Currency</th>
            <th>Edit/Remove</th>
          </tr>
        </tbody>
        {expenses.map((expense) => (
          <tbody key={expense.id}>
            <tr>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>
                {
                Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
              }
              </td>
              <td>
                {
                expense.exchangeRates[expense.currency].name
              }
              </td>
              <td>
                {
                (expense.exchangeRates[expense.currency].ask * Number(expense.value))
                  .toFixed(2)
              }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  onClick={() => dispatch(updateExpense(expense.id))}
                  data-testid="edit-btn"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(deleteExpense(expense.id))}
                  data-testid="delete-btn"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Table;
