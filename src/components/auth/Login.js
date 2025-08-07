import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // import karo
import { useNavigate } from 'react-router-dom'; // redirect ke liye

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // context se login function lo
  const navigate = useNavigate(); // navigation ke liye

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }); // login function call karo
      navigate('/'); // login ke baad home ya dashboard par bhejo
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
