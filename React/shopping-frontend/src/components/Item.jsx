import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { addItemToOrder, createOrder, getOpenOrder, addFavorite, removeFavorite, getFavorites } from '../api';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { AuthContext } from '../contexts/AuthContext';

const Item = ({ item }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    
    if (auth && auth.userId) {
      setUserId(auth.userId);
    }
  

    const fetchFavorites = async (userId) => {
      try {
        const favorites = await getFavorites(userId);
        const favoriteItem = favorites.find(fav => fav.item.id === item.id); // Assuming 'id' is the item's unique identifier
        setIsFavorite(!!favoriteItem);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    if (auth && auth.userId) {
      fetchFavorites(auth.userId);
    }
  }, [item.id, auth]);

  const handleAddToCart = async () => {
    if (!userId) {
      alert('User not logged in.');
      return;
    }

    try {
      let openOrder = await getOpenOrder();
      if (!openOrder) {
        openOrder = await createOrder(userId);
      }

      const response = await addItemToOrder(openOrder.id, item, userId);
      console.log('Item added to order:', response);

      setShowSuccessMessage(true);

      // Hide success message after 2 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding item to order:', error);
      alert('Failed to add item to order. Please try again later.');
    }
  };

  const handleToggleFavorite = async () => {
    if (!userId) {
      alert('User not logged in.');
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(userId, item.id);
        setIsFavorite(false);
      } else {
        await addFavorite(userId, item);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite status:', error);
      alert('Failed to update favorite status. Please try again later.');
    }
  };

  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={item.imageUrl} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>${item.price}</Card.Text>
        <Card.Text>{item.stock} items available</Card.Text>
        <Button variant="primary" disabled={item.stock === 0} onClick={handleAddToCart}>
          {item.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <Button 
          variant="outline-danger" 
          onClick={handleToggleFavorite} 
          className="ml-2" 
          disabled={!userId } // Disable button if user is not logged in
        >
          {isFavorite ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
        </Button>
        {showSuccessMessage && (
          <Alert variant="success" className="mt-3">
            Product added to cart successfully!
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default Item;
