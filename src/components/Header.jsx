import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const { email } = useSelector((store) => store.user);
  console.log(email);
  return (
    <header>
      <div>{email}</div>
    </header>
  );
}

export default Header;
