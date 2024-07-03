import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getClosedOrdersByUser } from '../api';
import Order from './Order';
import { Container, Alert, ListGroup, Spinner, Card, Row, Col } from 'react-bootstrap';

const OrderList = () => {
  const { auth } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (auth && auth.userId) {
        try {
          const response = await getClosedOrdersByUser(auth.userId);
          setOrders(response || []);
        } catch (err) {
          setError('Failed to fetch orders. Please try again later.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [auth]);

  if (!auth || !auth.userId) {
    return (
      <Container>
        <Alert variant="warning">Please log in to view your orders.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="my-4">Your Orders</h2>
      {error ? (
        <Alert variant="danger">{error}</Alert>
      ) : orders.length === 0 ? (
        <Alert variant="info">No closed orders found.</Alert>
      ) : (
        <Row>
          {orders.map(order => (
            <Col key={order.id} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Header as="h5">Order ID: {order.id}</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <strong>Date:</strong> {order.orderDate}<br />
                    <strong>Total Price:</strong> ${order.totalPrice}<br />
                    <strong>Status:</strong> {order.status}
                  </Card.Text>
                  <Card.Title>Items:</Card.Title>
                  <ListGroup variant="flush">
                    {order.items.map(item => (
                      <ListGroup.Item key={item.id}>
                        {item.title} - ${item.price} (Quantity: {item.quantity})
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default OrderList;
