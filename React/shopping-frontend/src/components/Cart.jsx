import React, { useContext, useEffect, useState } from 'react';
import { getOpenOrder, removeItemFromOrder, updateItemQuantityInOrder, completeOrder } from '../api';
import { Button, ListGroup, Image, Alert, Container, Row, Col, Form } from 'react-bootstrap';
import Checkout from './Checkout'; // Import the Checkout component
import { AuthContext } from '../contexts/AuthContext';

const Cart = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState({});
  const [showCheckout, setShowCheckout] = useState(false); // State to control showing Checkout
  const { auth } = useContext(AuthContext);

  const userId = auth.userId;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const openOrder = await getOpenOrder(userId);
        setOrder(openOrder);

        // Set initial quantities for each item
        const initialQuantities = {};
        openOrder.items.forEach(item => {
          initialQuantities[item.id] = item.quantity || 1;
        });
        setQuantities(initialQuantities);

      } catch (err) {
        setError('No items in the cart.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [userId]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  const handleUpdateQuantity = async (itemId) => {
    try {
      const newQuantity = quantities[itemId];
      const updatedOrder = await updateItemQuantityInOrder(order.id, userId, itemId, newQuantity);
      setOrder(updatedOrder);
    } catch (err) {
      console.error('Failed to update item quantity:', err);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const updatedOrder = await removeItemFromOrder(order.id, userId, itemId);
      setOrder(updatedOrder);
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const handleCompleteOrder = async () => {
    try {
      await completeOrder(order.id, userId);
      setOrder(null);
      setShowCheckout(false); // Close Checkout form after completion
      setError('Order completed successfully.');
    } catch (err) {
      console.error('Failed to complete order:', err);
    }
  };

  const handleCheckoutCancel = () => {
    setShowCheckout(false); // Hide Checkout form
  };

  const calculateTotalPrice = () => {
    if (!order || !order.items) return 0;
    return order.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <h2 className="my-4">Shopping Cart</h2>
      {error ? (
        <Alert variant="info">{error}</Alert>
      ) : (
        <div>
          {order && order.items && order.items.length > 0 ? (
            <>
              <ListGroup className="mb-4">
                {order.items.map(item => (
                  <ListGroup.Item key={item.id} className="mb-3 p-3">
                    <Row>
                      <Col xs={3} md={2}>
                        <Image src={item.imageUrl} thumbnail />
                      </Col>
                      <Col xs={6} md={4} className="align-self-center">
                        <div className="d-flex flex-column">
                          <span className="font-weight-bold">{item.title}</span>
                          <span className="text-muted">${item.price.toFixed(2)}</span>
                        </div>
                      </Col>
                      <Col xs={3} md={2} className="align-self-center">
                        <Form.Control
                          type="number"
                          value={quantities[item.id] || 1}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          min="1"
                        />
                      </Col>
                      <Col xs={6} md={3} className="align-self-center">
                        <Button variant="outline-primary" className="mr-2" onClick={() => handleUpdateQuantity(item.id)}>
                          Update
                        </Button>
                        <Button variant="outline-danger" onClick={() => handleRemoveItem(item.id)}>
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="d-flex justify-content-end align-items-center mb-4">
                <h4 className="mr-4">Total Price: ${calculateTotalPrice().toFixed(2)}</h4>
                {!showCheckout ? (
                  <Button variant="success" onClick={() => setShowCheckout(true)}>
                    Proceed to Checkout
                  </Button>
                ) : (
                  <Checkout orderId={order.id} userId={userId} onComplete={handleCheckoutCancel} />
                )}
              </div>
            </>
          ) : (
            <Alert variant="info">No items in the cart.</Alert>
          )}
        </div>
      )}
    </Container>
  );
};

export default Cart;
