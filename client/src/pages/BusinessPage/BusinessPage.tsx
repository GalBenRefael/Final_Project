import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { Link, useParams } from 'react-router-dom';
import { getCardById } from '../../services/ApiService';
import { CardProps } from '../../interfaces/Card';
import './BusinessPage.css';
import { toast } from 'react-toastify';

const CardDetails = () => {
  const { id } = useParams();
  const [card, setCard] = useState<CardProps>();

  useEffect(() => {
    if (!id) return;
    getCardById(id)
      .then((json) => {
        setCard(json);
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      });
  }, []);

  if (!card) {
    return <div>Loading...</div>;
  }

  const address = `${card.bizHouseNo} ${card.bizStreet}, ${card.bizCity},${card.bizZip}`;
  return (
    <>
      <div className="">
        <Title mainText="Business details" />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div>
                <label>Title</label>
                <h3>{card?.bizTitle}</h3>
              </div>
              <hr />
              <div>
                <label>Description</label>
                <h3>{card?.bizDescription}</h3>
              </div>
              <hr />
              <div>
                <label>Address</label>
                <h3>
                  {card?.bizHouseNo} &nbsp;
                  {card?.bizStreet}
                  <br />
                  {card?.bizCity}, {card?.bizZip}
                </h3>
              </div>
              <hr />
              <div>
                <label>Phone</label>
                <h3>{card?.bizPhone}</h3>
              </div>
              <hr />
              <div>
                <label>Website</label>
                <h3>{card?.bizWeb}</h3>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5">
              <img id="image" src={card?.bizImage} alt={card?.bizImageAlt} />
            </div>
          </div>
        </div>
        <div>
          <MapWithAddress address={address} />
        </div>
        <div style={{ position: 'fixed', right: '5%', bottom: '20%' }}>
          <Link to="/">
            <button className="btn btn-primary">Back to home</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CardDetails;

const getSrc = (address: string) => {
  const escapedAddress = encodeURIComponent(address);
  return (
    'https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=' +
    escapedAddress +
    '%20+()&amp;t=&amp&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
  );
};
export const MapWithAddress = ({ address }: { address: string }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      dangerouslySetInnerHTML={{
        __html: `
          <iframe 
              style="margin: 60px auto;"
              width="90%"
              height="700px"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              id="gmap_canvas" 
              
              src="${getSrc(address)}">
          </iframe>
      `.trim(),
      }}
    ></div>
  );
};
