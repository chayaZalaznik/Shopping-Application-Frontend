import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { deleteUser } from '../api';

const UserProfile = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  if (!auth) {
    return <div>Loading user details...</div>;
  }

  const handleDeleteUser = async () => {
    try {
      await deleteUser(auth.userId);
      setAuth(null); // Clear auth context
      localStorage.clear(); // Clear local storage
      window.location.href = '/'; // Redirect to home page
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user: ' + error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h2>User Profile</h2>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={4}>
                  <strong>Name:</strong>
                </Col>
                <Col md={8}>{auth.firstName + " " + auth.lastName}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={4}>
                  <strong>Email:</strong>
                </Col>
                <Col md={8}>{auth.email}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={4}>
                  <strong>Phone:</strong>
                </Col>
                <Col md={8}>{auth.phone}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={4}>
                  <strong>Address:</strong>
                </Col>
                <Col md={8}>{auth.address}</Col>
              </Row>
              <Button variant="danger" onClick={() => setShowModal(true)}>
                Delete User
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserProfile;
