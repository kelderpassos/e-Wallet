import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveEmail } from '../redux/slices/userSlice';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = ({ target }) => {
    if (target.name === 'email') setEmail(target.value);
    if (target.name === 'password') setPassword(target.value);
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    // const passwordPattern = /(?=.*[A-Z])/; must contain 1 uppercase letter
    const validEmail = emailPattern.test(email);
    const validPassword = password.length > 5;
    if (validEmail && validPassword) setIsDisabled(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveEmail(email));
    navigate('/wallet');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input name="email" type="text" placeholder="Insert your e-mail" value={email} onChange={handleInput} />
        </label>
        <label htmlFor="password">
          <input name="password" type="password" placeholder="Provide your password" value={password} onChange={handleInput} />
        </label>
        <button name="login" type="submit" disabled={isDisabled}>Log in</button>
      </form>
    </div>
  );
}

export default Login;
