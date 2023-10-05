import { useState } from 'react';
import FormLayout from '../../components/FormLayout';
import Title from '../../components/Title';
import { register } from '../../services/ApiService';
import './Signup.css';
import { useNavigate, Link, NavLink, Form } from 'react-router-dom';
import { toast } from 'react-toastify';

const passwordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
);

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState<null | File>(null);
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [zip, setZip] = useState('');
  const [isBiz, setIsbiz] = useState(false);
  const navigate = useNavigate();

  function validate(): boolean {
    if (!firstName || firstName.length < 2) {
      toast.error('First name is required.');
      return false;
    }
    if (!lastName || lastName.length < 2) {
      toast.error('Last name is required.');
      return false;
    }
    if (!country || country.length < 2) {
      toast.error('Country is required.');
      return false;
    }
    if (!city || city.length < 2) {
      toast.error('City is required.');
      return false;
    }
    if (!houseNumber) {
      toast.error('House number is required.');
      return false;
    }
    if (!email) {
      toast.error('email is required.');
      return false;
    }
    if (!phone || phone.length < 9) {
      toast.error('Phone is required.');
      return false;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character'
      );
      return false;
    }

    return true;
  }

  function clearFields() {
    setFirstName('');
    setLastName('');
    setMiddleName('');
    setState('');
    setCountry('');
    setEmail('');
    setPhone('');
    setPassword('');
    setImage(null);
    setCity('');
    setStreet('');
    setHouseNumber('');
    setZip('');
  }

  function handleClick() {
    if (!validate()) {
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('middleName', middleName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('password', password);
    if (image) {
      formData.append('image', image);
    }
    formData.append('state', state);
    formData.append('country', country);
    formData.append('city', city);
    formData.append('street', street);
    formData.append('houseNumber', houseNumber);
    formData.append('zip', zip);
    formData.append('isBiz', isBiz ? '1' : '');

    register(formData)
      .then((user) => {
        navigate('/login');
        toast.success('User registered Successfully');
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof Error) {
          toast.error('Registeration failed: ' + error.message);
        }
      });
  }

  return (
    <>
      <Title mainText="Register" />
      <FormLayout>
        <form>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                name="firstName"
                minLength={3}
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                onInput={(e) => {
                  setFirstNameError((e.target as any).validationMessage);
                }}
              />
              <label htmlFor="floatingInput">First Name &#42;</label>
              {firstNameError && (
                <div
                  className="invalid-feedback"
                  style={{ display: 'initial' }}
                >
                  {firstNameError}
                </div>
              )}
            </div>
            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                id="floatingPassword"
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
              <label htmlFor="floatingPassword">Middle Name</label>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                name="lastName"
                minLength={3}
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onInput={(e) => {
                  setLastNameError((e.target as any).validationMessage);
                }}
              />
              <label htmlFor="floatingInput">Last Name &#42;</label>
              {lastNameError && (
                <div
                  className="invalid-feedback"
                  style={{ display: 'initial' }}
                >
                  {lastNameError}
                </div>
              )}
            </div>
            <div className="form-floating right-input">
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                name="phone"
                minLength={2}
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onInput={(e) => {
                  setPhoneError((e.target as any).validationMessage);
                }}
              />
              <label htmlFor="floatingInput">Phone &#42;</label>
              {phoneError && (
                <div
                  className="invalid-feedback"
                  style={{ display: 'initial' }}
                >
                  {phoneError}
                </div>
              )}
            </div>
          </div>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email &#42;</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password &#42;</label>
            </div>
          </div>

          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <label htmlFor="floatingInput">State</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                id="floatingPassword"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <label htmlFor="floatingPassword">Country &#42;</label>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label htmlFor="floatingInput">City &#42;</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                id="floatingPassword"
                placeholder="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <label htmlFor="floatingPassword">Street &#42;</label>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="City"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
              />
              <label htmlFor="floatingInput">House Number &#42;</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                id="floatingPassword"
                placeholder="Street"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
              <label htmlFor="floatingPassword">Zip &#42;</label>
            </div>
          </div>
          <div className="form-check box d-flex">
            <input
              className="form-check me-2 mb-2"
              type="checkbox"
              checked={isBiz}
              onChange={() => setIsbiz(!isBiz)}
            ></input>
            <label className="form-check-label mb-2">Sign up as Business</label>
          </div>
          <br />
          <label className="form-check-label mb-2">Upload profile image:</label>
          <div className="d-flex">
            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                if (e.target.files) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>
          <br />
          <div className="d-flex">
            <div>
              <Link to={'/'}>
                <button type="button" className="btn text-danger" id="cancel">
                  Cancel
                </button>
              </Link>
            </div>
            <div>
              <button
                type="button"
                className="btn"
                id="refresh"
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
              onClick={handleClick}
              id="submit"
            >
              Sign Up
            </button>
            <div>
              <p>
                Already have an account?
                <NavLink to="/login">Log in</NavLink>
              </p>
            </div>
          </div>
        </form>
      </FormLayout>
    </>
  );
}

export default Signup;
