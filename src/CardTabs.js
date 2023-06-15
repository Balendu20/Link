import React, { useState,useEffect } from 'react';
import './App.css';

const CardTabs = () => {
  const [activeTab, setActiveTab] = useState('Your');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      // Mock API response
      const response = {
        data: [
          {
            name: 'Mixmax',
            budget_name: 'Software subscription',
            owner_id: 1,
            spent: {
              value: 100,
              currency: 'SGD',
            },
            available_to_spend: {
              value: 1000,
              currency: 'SGD',
            },
            card_type: 'burner',
            expiry: '9 Feb',
            limit: 100,
            status: 'active',
          },
          {
            name: 'Quickbooks',
            budget_name: 'Software subscription',
            owner_id: 2,
            spent: {
              value: 50,
              currency: 'SGD',
            },
            available_to_spend: {
              value: 250,
              currency: 'SGD',
            },
            card_type: 'subscription',
            limit: 10,
            status: 'active',
          },
        ],
        page: 1,
        per_page: 10,
        total: 100,
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCards(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredCards = cards.filter(
    (card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === 'All' || card.card_type === filterType)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="tab-container">
        <button
          className={activeTab === 'Your' ? 'active' : ''}
          onClick={() => handleTabChange('Your')}
        >
          Your
        </button>
        <button
          className={activeTab === 'All' ? 'active' : ''}
          onClick={() => handleTabChange('All')}
        >
          All
        </button>
        <button
          className={activeTab === 'Blocked' ? 'active' : ''}
          onClick={() => handleTabChange('Blocked')}
        >
          Blocked
        </button>
      </div>
      <div className="filter-container">
        <label htmlFor="filter">Filter by Type:</label>
        <select id="filter" value={filterType} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="burner">Burner</option>
          <option value="subscription">Subscription</option>
        </select>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by card name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="card-container">
        {filteredCards.map((card, index) => (
          <div className="card" key={index}>
            <h2>{card.name}</h2>
            <p>Budget: {card.budget_name}</p>
            <p>Owner ID: {card.owner_id}</p>
            <p>Spent: {card.spent.value} {card.spent.currency}</p>
            <p>Available to Spend: {card.available_to_spend.value} {card.available_to_spend.currency}</p>
            <p>Card Type: {card.card_type}</p>
            <p>Expiry: {card.expiry}</p>
            <p>Limit: {card.limit}</p>
            <p>Status: {card.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CardTabs;