// Signup.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const initialInput = { name: '', email: '', password: '' };
  const [input, setInput] = useState(initialInput);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const checkValidate = validate();
    if (Object.keys(checkValidate).length > 0) {
      setErrors(checkValidate);
    } else {
      setErrors({});
      setLoading(true);

      try {
        const checkEmail = await axios.get(`http://localhost:3100/users?email=${input.email}`);

        if (checkEmail.data.length > 0) {
          setInput({ ...checkEmail.data[0], id: undefined });
          setErrors({ ...errors, email: 'Email is already in use' });
        } else {
          setErrors({});
          await axios.post('http://localhost:3100/users', input);
          navigate('/login');
        }
      } catch (error) {
        console.error('Signup error:', error);
        setErrors({ password: 'An error occurred during signup' });
      } finally {
        setLoading(false);
      }
    }
  };

  const validate = () => {
    const errors = {};
    if (input.name.length < 1) {
      errors.name = 'Please enter your name';
    }
    if (input.email.length < 1) {
      errors.email = 'Please enter an email';
    }
    if (input.password.length < 1) {
      errors.password = 'Please enter a password';
    }
    return errors;
  };

  return (
    <div className="container text-center">
      <h2>Sign Up</h2>
      <form onSubmit={handleForm}>

                <div className="mb-1">
                    <label htmlFor="name" className=" p-3">Name</label><br/>
                    <input type="text" id="name" name="name" value={input.name} onChange={handleChange} className="p-2 border rounded " />
                    <p className='text-red-400'>{errors.name}</p>
                </div>
                <div className="mb-1">
                    <label htmlFor="email" className=" p-3">Email</label><br/>
                    <input type="email" id="email" name="email" value={input.email} onChange={handleChange} className="p-2 border rounded " />
                    <p className='text-red-400'>{errors.email}</p>
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className=" p-3">Password</label><br/>
                    <input type="password" id="password" name="password" value={input.password} onChange={handleChange}className="p-2 border rounded " />
                    <p className='text-red-400'>{errors.password}</p>
                </div>


        <div className="mb-5">
          <input type="submit" value={loading ? 'Signing Up...' : 'Sign Up'} className="p-2 rounded" disabled={loading} />
        </div>
        <p className="text-gray-500">
          Already have an account? <Link to="/login" className="text-pink-500">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
