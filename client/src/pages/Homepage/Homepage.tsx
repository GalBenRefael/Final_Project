import './Homepage.css';
import { Link } from 'react-router-dom';
import Title from '../../components/Title';
import { AppContext } from '../../App';
import { CardProps } from '../../interfaces/Card';
import { BusinessCard } from '../../components/BusinessCard';
import { useContext, useState } from 'react';
import { CategorySelect } from '../../components/CategorySelect';

interface HomepageProps {
  onDelete: (_id: string) => void;
  filteredBusiness: CardProps[];
  fetchBusinesses: () => Promise<void>;
}

function HomePage({
  onDelete,
  filteredBusiness,
  fetchBusinesses,
}: HomepageProps) {
  console.log(filteredBusiness);
  const [displayMode, setDisplayMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('');
  const context = useContext(AppContext);

  function handleDisplayChange(mode: string) {
    setDisplayMode(mode);
  }

  const filteredByCategory = selectedCategory
    ? filteredBusiness.filter(
        (business) => business.bizCategory === selectedCategory
      )
    : filteredBusiness;

  return (
    <>
      <Title
        mainText="Business Cards"
        subText="Here you can find Business Cards form all categories"
      />
      <div className="d-flex main">
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
        <CategorySelect
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="filterCategory"
          hasAllOption={true}
        />
      </div>

      <div className={displayMode}>
        {filteredByCategory.length === 0 && <div>No Cards to show</div>}
        {filteredByCategory.map((cardItem) => (
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

export default HomePage;
