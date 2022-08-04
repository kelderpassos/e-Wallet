import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const { email } = useSelector((store) => store.user);
  // const { expense } = useSelector(({ wallet }) => wallet.expenses[0]);

  return (
    <header>
      <div>{email}</div>
      <div>0</div>
    </header>
  );
}

export default Header;
