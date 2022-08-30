/* eslint-disable no-param-reassign */
import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const { email } = useSelector((store) => store.user);
  const { expenses } = useSelector((store) => store.wallet);
  // console.log(expenses, 'header');
  const totalExpenses = expenses.reduce((acc, expense) => {
    const { value, exchangeRates, currency } = expense;
    const rateValues = Object.values(exchangeRates);
    const { ask } = rateValues.find(({ code }) => code === currency);
    acc += ask * Number(value);
    return acc;
  }, 0);

  return (
    <header>
      <p>{email}</p>
      <p>{totalExpenses.toFixed(2)}</p>
      <p>BRL</p>
    </header>
  );
}

export default Header;
