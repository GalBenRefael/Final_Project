import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editCard, getCardById } from '../services/ApiService';
import { toast } from 'react-toastify';
import FormLayout from '../components/FormLayout';
import Title from '../components/Title';
import { CategorySelect } from '../components/CategorySelect';

function Edit({ fetchBusinesses }: { fetchBusinesses: () => void }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [bizCategory, setBizCategory] = useState('');
  const [bizTitle, setBizTitle] = useState('');
  const [bizSubTitle, setBizSubTitle] = useState('');
  const [bizDescription, setBizDescription] = useState('');
  const [bizHouseNo, setBizHouseNo] = useState('');
  const [bizPhone, setBizPhone] = useState('1');
  const [bizImage, setBizImage] = useState('');
  const [bizImageAlt, setBizImageAlt] = useState('');
  const [bizState, setBizState] = useState('');
  const [bizCountry, setBizCountry] = useState('');
  const [bizCity, setBizCity] = useState('');
  const [bizStreet, setBizStreet] = useState('');
  const [bizWeb, setBizWeb] = useState('');
  const [bizEmail, setBizEmail] = useState('');
  const [bizZip, setBizZip] = useState('');

  useEffect(() => {
    if (!id) return;

    getCardById(id).then((business) => {
      setBizTitle(business.bizTitle);
      setBizSubTitle(business.bizSubTitle);
      setBizDescription(business.bizDescription);
      setBizImageAlt(business.bizImageAlt);
      setBizPhone(business.bizPhone);
      setBizEmail(business.bizEmail);
      setBizState(business.bizState);
      setBizCountry(business.bizCountry);
      setBizCity(business.bizCity);
      setBizStreet(business.bizStreet);
      setBizHouseNo(business.bizHouseNo);
      setBizWeb(business.bizWeb);
      setBizImage(business.bizImage);
      setBizZip(business.bizZip);
      setBizCategory(business.bizCategory);
    });
  }, [id]);

  function validate(): boolean {
    if (!bizTitle) {
      toast.error('Title is required.');
      return false;
    }
    if (!bizSubTitle && bizSubTitle.length < 3) {
      toast.error('Subtutle is required.');
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
  function handleClick() {
    if (!validate()) {
      return;
    }
    if (!id) return;
    editCard(id, {
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
    })
      .then((json) => {
        fetchBusinesses();
        toast.success(`Card ${bizTitle} was Successfully edited`);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      });
  }

  return (
    <>
      <Title mainText="Edit Card" />
      <FormLayout>
        <form>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Business Title"
                value={bizTitle}
                onChange={(e) => setBizTitle(e.target.value)}
              />
              <label htmlFor="floatingInput">Title</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Subtitle"
                value={bizSubTitle}
                onChange={(e) => setBizSubTitle(e.target.value)}
              />
              <label htmlFor="floatingPassword">Subtitle</label>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Description"
                value={bizDescription}
                onChange={(e) => setBizDescription(e.target.value)}
              />
              <label htmlFor="floatingInput">Description</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="number"
                className="form-control"
                id="floatingPassword"
                placeholder="Phone"
                value={bizPhone}
                onChange={(e) => setBizPhone(e.target.value)}
              />
              <label htmlFor="floatingPassword">Phone</label>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={bizEmail}
                onChange={(e) => setBizEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
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
                id="floatingInput"
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
                id="floatingPassword"
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
                id="floatingInput"
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
                id="floatingPassword"
                placeholder="Country"
                value={bizCountry}
                onChange={(e) => setBizCountry(e.target.value)}
              />
              <label htmlFor="floatingPassword">Country</label>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="City"
                value={bizCity}
                onChange={(e) => setBizCity(e.target.value)}
              />
              <label htmlFor="floatingInput">City</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                id="floatingPassword"
                placeholder="Street"
                value={bizStreet}
                onChange={(e) => setBizStreet(e.target.value)}
              />
              <label htmlFor="floatingPassword">Street</label>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-floating left-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="House Number"
                value={bizHouseNo}
                onChange={(e) => setBizHouseNo(e.target.value)}
              />
              <label htmlFor="floatingInput">House Number</label>
            </div>
            <div className="form-floating right-input">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Street"
                value={bizZip}
                onChange={(e) => setBizZip(e.target.value)}
              />
              <label htmlFor="floatingPassword">Zip Code</label>
            </div>
          </div>

          <div>
            <CategorySelect
              onChange={(e) => setBizCategory(e.target.value)}
              value={bizCategory}
            />
          </div>

          <div className="d-flex">
            <div>
              <button type="button" className="btn text-danger" id="cancel">
                Cancel
              </button>
            </div>
            <div>
              <button type="button" className="btn" id="refresh">
                <i className="bi bi-arrow-clockwise text-primary"></i>
              </button>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="btn text-white bg-primary"
              id="submit"
              onClick={handleClick}
            >
              Update Details
            </button>
          </div>
        </form>
      </FormLayout>
    </>
  );
}

export default Edit;
