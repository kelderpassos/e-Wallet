/* eslint-disable no-param-reassign */
import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const { email } = useSelector((store) => store.user);
  const { expenses } = useSelector((store) => store.wallet);

  const totalExpenses = expenses.reduce((acc, expense) => {
    const { value, exchangeRates, currency } = expense;
    const rateValues = Object.values(exchangeRates);
    const { ask } = rateValues.find(({ code }) => code === currency);
    acc += ask * Number(value);
    return acc;
  }, 0);

  return (
    <header className="flex items-baseline place-content-between px-5 h-[3.5rem] h-[3rem] text-[#FFD700] bg-[#16140E] font-bold">
      <p className="mt-3 tracking-wide">{email}</p>
      <div className="flex mt-3 tracking-wide">
        <p className="flex mr-1">{totalExpenses.toFixed(2)}</p>
        <p>BRL</p>
      </div>
    </header>
  );
}

export default Header;
