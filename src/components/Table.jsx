import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense, updateExpense } from '../redux/slices/walletSlice';

function Table() {
  const { expenses } = useSelector(({ wallet }) => wallet);
  const dispatch = useDispatch();

  return (
    <table className="text-center w-full">
      <thead className="">
        <tr className="">
          <th className="w-[100px]">Description</th>
          <th className="w-[100px]">Tag</th>
          <th className="w-[100px]">Payment Method</th>
          <th className="w-[100px]">Value</th>
          <th className="w-[100px]">Currency</th>
          <th className="w-[100px]">Selected Currency</th>
          <th className="w-[100px]">Converted Value</th>
          <th className="w-[100px]">Conversion Currency</th>
          <th className="w-[100px]">Edit/Remove</th>
        </tr>
      </thead>
      {expenses.map((expense) => (
        <tbody className="" key={expense.id}>
          <tr className="">
            <td className="">{expense.description}</td>
            <td className="">{expense.tag}</td>
            <td className="">{expense.method}</td>
            <td className="">{Number(expense.value).toFixed(2)}</td>
            <td className="">
              {
                Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
              }
            </td>
            <td className="">
              {
                expense.exchangeRates[expense.currency].name
              }
            </td>
            <td className="">
              {
                (expense.exchangeRates[expense.currency].ask * Number(expense.value))
                  .toFixed(2)
              }
            </td>
            <td className="">Real</td>
            <td className="">
              <button
                className=""
                type="button"
                onClick={() => dispatch(updateExpense(expense.id))}
                data-testid="edit-btn"
              >
                Edit
              </button>
              <button
                className=""
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
  );
}

export default Table;
