import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './CreateCard.css';
import { addCard } from '../../services/ApiService';
import Title from '../../components/Title';
import FormLayout from '../../components/FormLayout';
import { CategorySelect } from '../../components/CategorySelect';

export interface CreateCardProps {
  fetchBusinesses: () => void;
  fetchUser: () => void;
}

function CreateCard({ fetchBusinesses, fetchUser }: CreateCardProps) {
  const navigate = useNavigate();
  const [user_id, setUser_Id] = useState('');
  const [bizCategory, setBizCategory] = useState('');
  const [bizTitle, setBizTitle] = useState('');
  const [bizSubTitle, setbizSubTitle] = useState('');
  const [bizDescription, setBizDescription] = useState('');
  const [bizHouseNo, setBizHouseNo] = useState('');
  const [bizPhone, setBizPhone] = useState('');
  const [bizImage, setBizImage] = useState('');
  const [bizImageAlt, setBizImageAlt] = useState('');
  const [bizState, setBizState] = useState('');
  const [bizCountry, setBizCountry] = useState('');
  const [bizCity, setBizCity] = useState('');
  const [bizStreet, setBizStreet] = useState('');
  const [bizWeb, setBizWeb] = useState('');
  const [bizEmail, setBizEmail] = useState('');
  const [bizZip, setBizZip] = useState('');

  function validate(): boolean {
    if (!bizTitle) {
      toast.error('Title is required.');
      return false;
    }
    if (!bizSubTitle && bizSubTitle.length < 3) {
      toast.error('Subtitle is required.');
      return false;
    }
    if (!bizDescription && bizDescription.length < 3) {
      toast.error('Description is required.');
      return false;
    }
    if (!bizPhone) {
      toast.error('phone is required.');
      return false;
    }

    if (!bizEmail && bizEmail.length <= 0) {
      toast.error('Email is required.');
      return false;
    }
    return true;
  }

  async function handleClick() {
    try {
      if (!validate()) {
        return;
      }
      await addCard({
        user_id,
        bizTitle,
        bizSubTitle,
        bizDescription,
        bizImageAlt,
        bizPhone,
        bizEmail,
        bizState,
        bizCountry,
        bizCity,
        bizStreet,
        bizHouseNo,
        bizZip,
        bizWeb,
        bizImage,
        bizCategory,
      });
      fetchBusinesses();
      fetchUser();
      setBizTitle('');
      setbizSubTitle('');
      setBizDescription('');
      setBizPhone('');
      setBizEmail('');
      setBizImage('');
      setBizImageAlt('');
      setBizState('');
      setBizCountry('');
      setBizCity('');
      setBizStreet('');
      setBizHouseNo('');
      setBizZip('');
      setBizWeb('');

      navigate('/');

      toast.success('Business Card has been Added!');
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <div id="createCard">
      <Title mainText="Create Business Card" />
      <FormLayout>
        <form>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                placeholder="Business Name"
                value={bizTitle}
                onChange={(e) => setBizTitle(e.target.value)}
              />
              <label htmlFor="floatingInput">Title &#42;</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                placeholder="Subtitle"
                value={bizSubTitle}
                onChange={(e) => setbizSubTitle(e.target.value)}
              />
              <label htmlFor="floatingPassword">Subtitle &#42;</label>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={bizDescription}
                onChange={(e) => setBizDescription(e.target.value)}
              />
              <label htmlFor="floatingInput">Description &#42;</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="number"
                className="form-control"
                placeholder="Phone"
                value={bizPhone}
                onChange={(e) => setBizPhone(e.target.value)}
              />
              <label htmlFor="floatingPassword">Phone &#42;</label>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={bizEmail}
                onChange={(e) => setBizEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email &#42;</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                placeholder="Website"
                value={bizWeb}
                onChange={(e) => setBizWeb(e.target.value)}
              />
              <label htmlFor="floatingPassword">Website</label>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                placeholder="Image Url"
                value={bizImage}
                onChange={(e) => setBizImage(e.target.value)}
              />
              <label htmlFor="floatingInput">Image Url</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                placeholder="Image alt"
                value={bizImageAlt}
                onChange={(e) => setBizImageAlt(e.target.value)}
              />
              <label htmlFor="floatingPassword">Image alt</label>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                placeholder="State"
                value={bizState}
                onChange={(e) => setBizState(e.target.value)}
              />
              <label htmlFor="floatingInput">State</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                value={bizCountry}
                onChange={(e) => setBizCountry(e.target.value)}
              />
              <label htmlFor="floatingPassword">Country &#42;</label>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                value={bizCity}
                onChange={(e) => setBizCity(e.target.value)}
              />
              <label htmlFor="floatingInput">City &#42;</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                placeholder="Street"
                value={bizStreet}
                onChange={(e) => setBizStreet(e.target.value)}
              />
              <label htmlFor="floatingPassword">Street &#42;</label>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                placeholder="House Number"
                value={bizHouseNo}
                onChange={(e) => setBizHouseNo(e.target.value)}
              />
              <label htmlFor="floatingInput">House Number &#42;</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                placeholder="Street"
                value={bizZip}
                onChange={(e) => setBizZip(e.target.value)}
              />
              <label htmlFor="floatingPassword">Zip Code &#42;</label>
            </div>
          </div>
          <div>
            <CategorySelect
              onChange={(e) => setBizCategory(e.target.value)}
              value={bizCategory}
            />
          </div>
          <br />
          <div className="d-flex">
            <button type="button" className="btn text-danger" id="cancel">
              Cancel
            </button>
            <button type="button" className="btn" id="refresh">
              <i className="bi bi-arrow-clockwise text-primary"></i>
            </button>
          </div>
          <div>
            <button
              id="submit"
              type="button"
              className="btn text-white bg-primary"
              onClick={handleClick}
            >
              Add
            </button>
          </div>
        </form>
      </FormLayout>
    </div>
  );
}

export default CreateCard;
