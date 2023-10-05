import Title from '../components/Title';
import { useContext, useState } from 'react';
import { AppContext } from '../App';
import { CardProps } from '../interfaces/Card';
import { BusinessCard } from '../components/BusinessCard';

function FavCards({
  businesses,
  fetchBusinesses,
  onDelete,
}: {
  businesses: CardProps[];
  fetchBusinesses: () => Promise<void>;
  onDelete: (_id: string) => Promise<void>;
}) {
  const context = useContext(AppContext);
  const [displayMode, setDisplayMode] = useState('grid');

  const userBusinesses = businesses.filter((business) =>
    context?.user?.favorites.includes(business._id)
  );
  function handleDisplayChange(mode: string) {
    setDisplayMode(mode);
  }

  return (
    <>
      <Title
        mainText="Favorite Cards"
        subText="Here you can find your Fav Cards"
      />
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
      </div>
      <div className={displayMode}>
        {userBusinesses.length === 0 && (
          <div className="text-center">No Favorite Cards to show</div>
        )}
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

export default FavCards;
