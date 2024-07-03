import React, { useState, useEffect } from 'react';
import { fetchItems } from '../api';
import ItemList from './ItemList';
import SearchBar from './SearchBar';

const MainPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetchItems();
        setItems(response);
      } catch (err) {
        console.error('Failed to fetch items:', err);
        setError('Failed to fetch items. Please try again later.');
      }
    };

    getItems();
  }, []);

  return (
    <div>
      <div className="text-center mt-4 mb-4">
        <video width="100%" height="auto" controls loop autoPlay muted>
          <source src="https://www.sifreiorhachaim.co.il/wp-content/uploads/2024/06/montheBook2024.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {error && <div className="alert alert-danger mt-4">{error}</div>}
      <div className="container mt-4">
        <SearchBar setItems={setItems} />
      </div>
      <div className="container">
        <ItemList items={items} />
      </div>
    </div>
  );
};

export default MainPage;
