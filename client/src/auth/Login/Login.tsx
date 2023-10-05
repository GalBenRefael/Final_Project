import { FormEvent, useContext, useState } from 'react';
import FormLayout from '../../components/FormLayout';
import Title from '../../components/Title';
import { toast } from 'react-toastify';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import User from '../Signup/Signup';
import { NavLink } from 'react-router-dom';

import { setToken } from '../TokenManager';
import { login, startPasswordReset } from '../../services/ApiService';
import { AppContext } from '../../App';

interface LoginProps {
  fetchUser: () => void;
}

function Login({ fetchUser }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(AppContext);
  const navigate = useNavigate();

  function validate(): boolean {
    if (!email.includes('@')) {
      toast.error('email is invalid.');
      return false;
    }

    if (!password || password.length < 8) {
      toast.error('Password must contain at least 8 characters');
      return false;
    }

    return true;
  }

  function clearFields() {
    setEmail('');
    setPassword('');
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
    login({
      email,
      password,
    })
      .then((user) => {
        setToken(user.token);
        if (context) {
          context.setUser(user);
        }
        fetchUser();
        navigate('/');
        toast.success(`Welcome ${user.firstName}`);
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      });
  }

  const handleResetPassword = async () => {
    if (!email) {
      return toast.error('Please fill your email');
    }
    try {
      await startPasswordReset(email);
      toast.success('Please check your email for the code');
      navigate('/reset-password');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Title mainText="Login" />

      <FormLayout>
        <form onSubmit={handleSubmit}>
          <div className="form-floating left-input2">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating right-input2">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="d-flex">
            <div>
              <Link to={'/'}>
                <button type="button" className="btn text-danger" id="cancel2">
                  Cancel
                </button>
              </Link>
            </div>
            <div>
              <button
                type="button"
                className="btn"
                id="refresh2"
                onClick={clearFields}
              >
                <i className="bi bi-arrow-clockwise text-primary"></i>
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn text-white bg-primary"
              id="submit2"
              disabled={!email || !password}
            >
              Submit
            </button>
          </div>
          <div>
            <p>
              Don't have an account? <NavLink to="/register">Sign up</NavLink>
            </p>
            <p>
              Forgot your password?{' '}
              <Link to="#" onClick={handleResetPassword}>
                Reset Password
              </Link>
            </p>
          </div>
        </form>
      </FormLayout>
    </>
  );
}

export default Login;
