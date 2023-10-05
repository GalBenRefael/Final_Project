import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import FormLayout from '../../components/FormLayout';
import { editUser, getUserById } from '../../services/ApiService';
import { toast } from 'react-toastify';
import { User } from '../../interfaces/User';
import './EditUser.css';

interface EditUserProps {
  fetchUser: () => void;
  loggedInUser: User | undefined;
}

const EditUser = ({ fetchUser, loggedInUser }: EditUserProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState<null | File>(null);
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [zip, setZip] = useState('');
  const [isBiz, setIsbiz] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User>();
  const location = useLocation();

  useEffect(() => {
    if (!id) return;
    getUserById(id)
      .then((user) => {
        console.log(user);
        setUser(user);
        setFirstName(user.firstName as string);
        setMiddleName(user.middleName as string);
        setLastName(user.lastName as string);
        setPhone(user.phone as string);
        setImageUrl(user.imageUrl as string);
        setImageAlt(user.imageAlt as string);
        setState(user.state as string);
        setCountry(user.country as string);
        setCity(user.city as string);
        setStreet(user.street as string);
        setHouseNumber(user.houseNumber as string);
        setZip(user.zip as string);
        setIsbiz(!!user.isBiz);
        setIsAdmin(!!user.isAdmin);
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      });
  }, [id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!id) return;

    const formData = new FormData();
    formData.append('_id', id);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('middleName', middleName);
    formData.append('phone', phone);

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
    formData.append('isAdmin', isAdmin ? '1' : '');

    editUser(id, formData)
      .then((json) => {
        if (location.pathname.includes('sandbox')) {
          navigate('/sandbox');
        } else {
          navigate('/');
        }
        toast.success('User edited successfully.');
        fetchUser();
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      });
  };

  return (
    <>
      <Title mainText="Edit user" />
      <FormLayout>
        <form>
          <div className="d-flex ">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="City"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="floatingInput">First Name: &#42;</label>
            </div>

            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Street"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
              <label htmlFor="floatingInput">Middle Name:</label>
            </div>
          </div>

          <div className="d-flex ">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="floatingInput">Last Name: &#42;</label>
            </div>

            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Street"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="floatingInput">Phone:</label>
            </div>
          </div>

          <div className="d-flex ">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Image Url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <label htmlFor="floatingInput">Image Url: &#42;</label>
            </div>

            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Image Alt"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
              />
              <label htmlFor="floatingInput">Image Alt:</label>
            </div>
          </div>
          <div className="d-flex ">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <label htmlFor="floatingInput">State: &#42;</label>
            </div>

            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="State"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <label htmlFor="floatingInput">Country:</label>
            </div>
          </div>
          <div className="d-flex ">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Country"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label htmlFor="floatingInput">City: &#42;</label>
            </div>

            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <label htmlFor="floatingInput">Street:</label>
            </div>
          </div>
          <div className="d-flex ">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="City"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
              />
              <label htmlFor="floatingInput">House Number: &#42;</label>
            </div>

            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Street"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
              <label htmlFor="floatingInput">Zip:</label>
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
          {loggedInUser?.isAdmin && (
            <div className="form-check box d-flex">
              <input
                className="form-check me-2 mb-2"
                type="checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              ></input>
              <label className="form-check-label mb-2">Admin</label>
            </div>
          )}
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

          <button
            onClick={handleSubmit}
            className="w-100 mb-2 btn btn-lg btn-primary border rounded-3 modal-submit-btn"
            type="submit"
            id="submit"
          >
            Edit
          </button>
        </form>
      </FormLayout>
    </>
  );
};

export default EditUser;
