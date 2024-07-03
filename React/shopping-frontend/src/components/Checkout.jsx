import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { completeOrder, getOpenOrder } from '../api';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ orderId, onComplete }) => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderDetails = {
        userId,
        orderId,
      };
      await completeOrder(orderDetails);
      onComplete();
      navigate('/') // Trigger parent component action after completing order
    } catch (err) {
      setError('Failed to complete order. Please try again.');
      console.error('Checkout Error:', err);
    }
  };

  return (
    <Container>
      <h2>Checkout</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formShippingAddress">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter shipping address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPaymentDetails">
          <Form.Label>Payment Details</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter payment details"
            value={paymentDetails}
            onChange={(e) => setPaymentDetails(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Complete Order
        </Button>
      </Form>
    </Container>
  );
};

export default Checkout;
