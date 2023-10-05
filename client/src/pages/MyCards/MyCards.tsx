import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { CardProps } from '../../interfaces/Card';
import { BusinessCard } from '../../components/BusinessCard';
import './MyCards.css';

function MyCards({
  businesses,
  onDelete,
  fetchBusinesses,
}: {
  businesses: CardProps[];
  onDelete: (_id: string) => void;
  fetchBusinesses: () => Promise<void>;
}) {
  const context = useContext(AppContext);
  const [displayMode, setDisplayMode] = useState('grid');

  const userBusinesses = businesses.filter((business) =>
    context?.user?.cards.includes(business._id)
  );
  function handleDisplayChange(mode: string) {
    setDisplayMode(mode);
  }

  return (
    <>
      <Title mainText="My Cards" subText="Here you can find your Cards" />
      <div className="d-flex">
        <div className="px-3 sort">
          <button
            onClick={() => handleDisplayChange('grid')}
            className="btn btn-light mx-1"
          >
            <i className="bi bi-grid-3x3-gap-fill"></i>
          </button>
          <button
            onClick={() => handleDisplayChange('list')}
            className="btn btn-light mx-1"
          >
            <i className="bi bi-list-ul"></i>
          </button>
        </div>
        {context?.user?.isBiz && (
          <div>
            <Link to={'/create'}>
              <button className="btn btn-primary" id="add">
                Add Card
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className={displayMode}>
        {userBusinesses.length === 0 && <div>No Cards to show</div>}
        {userBusinesses.map((cardItem) => (
          <BusinessCard
            key={cardItem._id}
            cardItem={cardItem}
            onDelete={onDelete}
            fetchBusinesses={fetchBusinesses}
          />
        ))}
      </div>
    </>
  );
}

export default MyCards;
