import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { fetchFavorites, removeFavorite } from '../api';
import { AuthContext } from '../contexts/AuthContext';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);
  const { userId } = auth;

  useEffect(() => {
    if (userId) {
      loadFavorites(userId);
    } else {
      setLoading(false);
    }
  }, [userId]);

  const loadFavorites = async (userId) => {
    try {
      const response = await fetchFavorites(userId);
      setFavorites(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (itemId) => {
    try {
      await removeFavorite(userId, itemId);
      setFavorites(favorites.filter(fav => fav.item.id !== itemId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return <div>Please log in to view your favorites.</div>;
  }

  return (
    <Container>
      <h2>Your Favorite Items</h2>
      {favorites.length === 0 ? (
        <div>No favorite items found.</div>
      ) : (
        <Row>
          {favorites.map(fav => (
            <Col key={fav.item.id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={fav.item.imageUrl} />
                <Card.Body>
                  <Card.Title>{fav.item.title}</Card.Title>
                  <Card.Text>${fav.item.price}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFavorite(fav.item.id)}
                  >
                    Remove from Favorites
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default FavoritesPage;
