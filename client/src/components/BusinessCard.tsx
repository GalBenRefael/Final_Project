import { Link, NavLink, useLocation } from 'react-router-dom';
import { AppContext } from '../App';
import { CardProps } from '../interfaces/Card';
import { useContext } from 'react';
import { favorite } from '../services/ApiService';
import { toast } from 'react-toastify';

export function BusinessCard({
  cardItem,
  onDelete,
  fetchBusinesses,
}: {
  cardItem: CardProps;
  onDelete: (_id: string) => void;
  fetchBusinesses: () => Promise<void>;
}) {
  const context = useContext(AppContext);
  const location = useLocation();
  const isMyCardPage = location.pathname === '/mycards';

  const handlePhoneIconClick = () => {
    window.open(`tel:${cardItem.bizPhone}`);
  };

  const handleFavoriteClick = async () => {
    try {
      const result = await favorite(cardItem._id);
      if (result.success) {
        toast.success(`${result.type} favorites`);
        context?.fetchUser();
        fetchBusinesses();
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="card m-3 col shadow p-3 mb-5 rounded" key={cardItem._id}>
      <NavLink to={`/business/${cardItem._id}`}>
        <img
          src={cardItem.bizImage}
          className="card-img-top"
          alt={cardItem.bizImageAlt}
        />
      </NavLink>

      <div className="card-body p-3">
        <h5 className="card-title">{cardItem.bizTitle}</h5>

        <p className="card-text">{cardItem.bizSubTitle}</p>
        <hr />
        <small className="card-text">Phone: {cardItem.bizPhone}</small>
        <br />
        <small className="card-text">
          Address: {cardItem.bizHouseNo} {cardItem.bizStreet},{' '}
          {cardItem.bizCity}
        </small>
        <br />
        <small className="card-text">Category: {cardItem.bizCategory}</small>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  {context?.user?.isAdmin && (
                    <button
                      className="btn btn-default"
                      onClick={() => onDelete(cardItem._id as string)}
                    >
                      <i className="bi bi-trash" style={{ float: 'left' }} />
                    </button>
                  )}

                  {context?.user?.isAdmin && (
                    <Link
                      className="btn btn-default"
                      to={`/edit/${cardItem._id}`}
                    >
                      <i className="bi bi-pen" />
                    </Link>
                  )}
                  <button className="btn" onClick={handlePhoneIconClick}>
                    <i className="bi bi-telephone-fill">
                      <a href="tel:"></a>
                    </i>
                  </button>
                  {context?.user && (
                    <span
                      className="btn btn-default"
                      onClick={handleFavoriteClick}
                    >
                      <i
                        className="bi bi-heart-fill"
                        style={{
                          color: context.user.favorites.includes(cardItem._id)
                            ? 'red'
                            : undefined,
                        }}
                      ></i>
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
