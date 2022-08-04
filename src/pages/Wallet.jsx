import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getExchangeRates, getUpdatedExchangeRates, saveExpense } from '../redux/slices/walletSlice';
import Header from '../components/Header';
import Table from '../components/Table';
import Loading from '../components/Loading';

function Wallet() {
  const [state, setState] = useState({
    id: '',
    value: '',
    description: '',
    currency: 'USD',
    method: 'Cash',
    category: 'Food',
  });
  const { currencies, isLoading } = useSelector(({ wallet }) => wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExchangeRates());
  }, []);

  const handleInput = ({ target: { name, value } }) => {
    setState((prevState) => ({ ...prevState, id: uuidv4(), [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveExpense(state));
    dispatch(getUpdatedExchangeRates(state));
    setState(() => ({ value: '', description: '' }));
  };

  return (
    <div>
      <Header />
      <div>na carteira</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="value">
          {' '}
          Value
          <input
            name="value"
            type="text"
            placeholder="amount"
            value={state.value}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="description">
          {' '}
          Description
          <input
            name="description"
            type="text"
            placeholder="product"
            value={state.description}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="currency">
          Currency:
          <select
            value={state.currency}
            name="currency"
            onChange={handleInput}
          >
            {currencies.map((currency) => (
              <option key={uuidv4()}>{ currency }</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Payment Method
          <select
            name="method"
            onChange={handleInput}
          >
            <option>Cash</option>
            <option>Credit card</option>
            <option>Debit card</option>
          </select>
        </label>
        <label htmlFor="category">
          Category
          <select
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
      </form>
      <button type="submit" name="saveExp" onClick={handleSubmit}>Save Expense</button>
      {isLoading ? <Loading />
        : (
          <main>
            <Table />
          </main>
        )}
    </div>
  );
}

export default Wallet;
