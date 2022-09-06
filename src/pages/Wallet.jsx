import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getExchangeRates, getUpdatedExchangeRates, submitUpdates } from '../redux/slices/walletSlice';
import Header from '../components/Header';
import Table from '../components/Table';

const initialState = {
  id: '',
  value: '',
  description: '',
  currency: 'USD',
  method: 'Cash',
  category: 'Clothing',
};

function Wallet() {
  const [expense, setExpense] = useState(initialState);
  const [updatesOnExpense, setUpdatesOnExpense] = useState({});
  const {
    currencies, expenses, isEdit, expenseId, expenseToBeUpdated,
  } = useSelector(({ wallet }) => wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExchangeRates());
  }, []);

  const handleInput = ({ target: { name, value } }) => {
    setExpense((prevState) => ({ ...prevState, id: uuidv4(), [name]: value }));
    setUpdatesOnExpense({ ...expenseToBeUpdated, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUpdatedExchangeRates(expense));
    setExpense(() => ({ ...initialState, value: '', description: '' }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(submitUpdates(updatesOnExpense));
    setExpense(() => ({ ...initialState, value: '', description: '' }));
  };

  return (
    <div className="h-screen">
      <Header />
      <form className="flex bg-[#2C292A] border lg:justify-between items-center px-3 py-3 h-[4rem] " onSubmit={handleSubmit}>
        <label htmlFor="value" className="tracking-wide text-[#e7ebef]">
          {' '}
          Value
          <input
            className="ml-2 w-32 text-center text-black rounded-md focus:placeholder-transparent placeholder-black bg-[#f4f1f1]"
            name="value"
            type="number"
            placeholder="amount"
            value={expense.value}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="currency" className="ml-2 tracking-wide text-[#e7ebef]">
          Currency:
          <select
            className="ml-2 md:w-20 text-[#0a0a0a] rounded-md text-center bg-[#f4f1f1] p-1"
            value={expense.currency}
            name="currency"
            onChange={handleInput}
          >
            {currencies.map((currency) => (
              <option key={uuidv4()}>{ currency }</option>
            ))}
          </select>
        </label>
        <label htmlFor="method" className="ml-2 tracking-wide text-[#e7ebef]">
          Payment Method
          <select
            className="ml-2  text-[#0a0a0a] rounded-md text-center bg-[#f4f1f1] p-1 "
            name="method"
            onChange={handleInput}
          >
            <option>Cash</option>
            <option>Credit card</option>
            <option>Debit card</option>
          </select>
        </label>
        <label htmlFor="category" className="ml-2 tracking-wide text-[#e7ebef]">
          Category
          <select
            className="ml-2 md:w-[8rem] text-[#0a0a0a] rounded-md text-center bg-[#f4f1f1] p-1"
            name="category"
            type="dropdown"
            onChange={handleInput}
          >
            <option>Clothing</option>
            <option>Food</option>
            <option>Gadgets</option>
            <option>Health</option>
            <option>Leisure</option>
            <option>Transportation</option>
            <option>Work</option>
          </select>
        </label>
        <label htmlFor="description" className="ml-2 tracking-wide text-[#e7ebef]">
          {' '}
          Description
          <input
            className="ml-2 w-32 text-center text-black rounded-md focus:placeholder-transparent placeholder-black bg-[#f4f1f1]"
            name="description"
            type="text"
            placeholder="product"
            value={expense.description}
            onChange={handleInput}
          />
        </label>
        { !isEdit ? (
          <button
            className="bg-white hover:bg-[#FFD700] rounded-xl lg:py-2 lg:px-3 p-1 text-black text-[14px]"
            type="button"
            name="expensesBtn"
            onClick={handleSubmit}
          >
            Add Expense
          </button>
        ) : (
          <button
            className="bg-white hover:bg-[#FFD700] rounded-xl lg:py-2 lg:px-3 p-1 text-black text-[14px]"
            type="button"
            name="editBtn"
            onClick={handleEdit}
          >
            Edit Expense
          </button>
        )}
      </form>
      <main className="bg-[#181410] h-screen">
        <h1 className="flex justify-center items-center h-[2.5rem] font-bold text-[18px] text-[#FFD700]">Transactions</h1>
        <Table />
      </main>
    </div>
  );
}

export default Wallet;
