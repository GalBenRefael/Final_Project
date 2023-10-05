import { useContext, useState } from 'react';
import FormLayout from '../../components/FormLayout';
import Title from '../../components/Title';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { resetPassword, startPasswordReset } from '../../services/ApiService';
import { AppContext } from '../../App';

interface ResetPasswordProps {}

export function ResetPassword({}: ResetPasswordProps) {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const context = useContext(AppContext);
  const navigate = useNavigate();

  function validate(): boolean {
    if (!code) {
      toast.error('code is required.');
      return false;
    }

    if (!newPassword || newPassword.length < 8) {
      toast.error('Password must contain at least 8 characters');
      return false;
    }

    return true;
  }

  function clearFields() {
    setCode('');
    setNewPassword('');
  }

  async function handleClick() {
    const isValid = validate();
    if (!isValid) {
      return;
    }

    try {
      const user = await resetPassword({
        code,
        newPassword,
      });
      navigate('/login');
      toast.success(`Password was reset succesfully`);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <>
      <Title mainText="Reset password" />

      <FormLayout>
        <form>
          <div className="form-floating left-input2">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Code"
              onChange={(e) => setCode(e.target.value)}
            />
            <label htmlFor="floatingInput">Code</label>
          </div>
          <div className="form-floating right-input2">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="New password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">New Password</label>
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
              type="button"
              className="btn text-white bg-primary"
              id="submit2"
              onClick={handleClick}
              disabled={!code || !newPassword}
            >
              Submit
            </button>
          </div>
          <div>
            <p>
              Don't have an account? <NavLink to="/register">Sign up</NavLink>
            </p>
          </div>
        </form>
      </FormLayout>
    </>
  );
}
