import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense, updateExpense } from '../redux/slices/walletSlice';

function Table() {
  const { expenses } = useSelector(({ wallet }) => wallet);
  const dispatch = useDispatch();

  return (
    <table className="text-center w-full text-[#e7ebef] ">
      <thead className="h-[3.5rem] -mt-5">
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
          <div className="border-none mt-3" />
          <tr className="border-2 border-[#FFD700] h-[4rem] ">
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
                expense.exchangeRates[expense.currency].code
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
                className="bg-white hover:bg-[#FFD700] rounded-lg lg:p-2 px-[23px] text-black text-[13px]"
                type="button"
                onClick={() => dispatch(updateExpense(expense.id))}
                data-testid="edit-btn"
              >
                Edit
              </button>
              <button
                className="bg-white hover:bg-[#FFD700] rounded-lg lg:p-2 px-[10px] lg:ml-[5px] text-black text-[13px]"
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
