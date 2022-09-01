import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getExchangeRates, getUpdatedExchangeRates, submitUpdates } from '../redux/slices/walletSlice';
import Header from '../components/Header';
import Table from '../components/Table';
import Loading from '../components/Loading';

const initialState = {
  id: '',
  value: '',
  description: '',
  currency: 'USD',
  method: 'Cash',
  tag: 'Food',
};

function Wallet() {
  const [expense, setExpense] = useState(initialState);
  const {
    currencies, isLoading, expenses, isEdit, expenseId,
  } = useSelector(({ wallet }) => wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExchangeRates());
  }, []);

  const handleInput = ({ target: { name, value } }) => {
    setExpense((prevState) => ({ ...prevState, id: uuidv4(), [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUpdatedExchangeRates(expense));
    setExpense(() => ({ ...initialState, value: '', description: '' }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const editions = expenses.map((prevExpense) => {
      if (expenseId === prevExpense.id) {
        return { ...expense, exchangeRates: prevExpense.exchangeRates };
      }
      return prevExpense;
    });
    dispatch(submitUpdates(editions));
    setExpense(() => ({ ...initialState, value: '', description: '' }));
  };

  return (
    <div className=" bg-[#0a0a0a] h-screen">
      <Header />
      <form className="flex bg-[#f5f5f5] justify-between " onSubmit={handleSubmit}>
        <label htmlFor="value">
          {' '}
          Value
          <input
            className="ml-2 md:w-32"
            name="value"
            type="number"
            placeholder="amount"
            value={expense.value}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="description">
          {' '}
          Description
          <input
            className="ml-2 md:w-32"
            name="description"
            type="text"
            placeholder="product"
            value={expense.description}
            onChange={handleInput}
          />
        </label>
        <label className="ml-2" htmlFor="currency">
          Currency:
          <select
            className="ml-2 md:w-20 text-[#0a0a0a]"
            value={expense.currency}
            name="currency"
            onChange={handleInput}
          >
            {currencies.map((currency) => (
              <option key={uuidv4()}>{ currency }</option>
            ))}
          </select>
        </label>
        <label className="ml-2" htmlFor="method">
          Payment Method
          <select
            className="ml-2 md:w-20 text-[#0a0a0a]"
            name="method"
            onChange={handleInput}
          >
            <option>Cash</option>
            <option>Credit card</option>
            <option>Debit card</option>
          </select>
        </label>
        <label className="ml-2" htmlFor="category">
          Category
          <select
            className="ml-2 md:w-[8rem] text-[#0a0a0a] md:text-sm"
            name="category"
            type="dropdown"
            onChange={handleInput}
          >
            <option>Food</option>
            <option>Leisure</option>
            <option>Work</option>
            <option>Transportation</option>
            <option>Health</option>
          </select>
        </label>
        { !isEdit ? (
          <button
            type="button"
            name="expensesBtn"
            onClick={handleSubmit}
          >
            Add Expense
          </button>
        ) : (
          <button
            type="button"
            onClick={handleEdit}
          >
            Edit Expense
          </button>
        )}
      </form>
      {isLoading ? <Loading />
        : (
          <main className="bg-[#1f2530] h-screen mt-5">
            <Table />
          </main>
        )}
    </div>
  );
}

export default Wallet;
