import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveEmail } from '../redux/slices/userSlice';
import backgroundCover from '../images/login-background.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const validEmail = emailPattern.test(email);
    if (validEmail && password.length > 5) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const handleInput = ({ target }) => {
    if (target.name === 'email') setEmail(target.value);
    if (target.name === 'password') setPassword(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveEmail(email));
    navigate('/wallet');
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundCover})` }} className="bg-cover bg-no-repeat h-screen flex flex-col items-center justify-center">
      <div className="border-[1px] border-[#8f94a8] rounded-2xl bg-[#1c1713]/[0.50] bg-clip-padding h-[20rem] w-[30rem] flex flex-col items-center justify-center backdrop-filter backdrop-grayscale backdrop-blur-sm">
        <h1 className="text-gray-400 tracking-wide text-4xl prose prose-stone">E-Wallet</h1>
        <form className="bg- p-5 flex flex-col " onSubmit={handleSubmit}>
          <label htmlFor="email">
            <input className="p-[0.5rem] placeholder-gray-700 rounded-md" name="email" type="text" placeholder="Insert your e-mail" value={email} onChange={handleInput} />
          </label>
          <label className="mt-3" htmlFor="password">
            <input className="p-[0.5rem] rounded-md placeholder-gray-700" name="password" type="password" placeholder="Provide your password" value={password} onChange={handleInput} />
          </label>
          <button className="text-white mt-5 font-medium text-xl enabled:hover:bg-gray-500 disabled:opacity-50 rounded-md p-1 bg-gray-400" name="login" type="submit" disabled={isDisabled}>Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
