import React, { useContext } from 'react';
import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';

const NavbarComponent = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setAuth(null);
    navigate('/login'); // Navigate to login page after logout
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img 
          src="https://www.sifreiorhachaim.co.il/wp-content/smush-webp/2024/02/logonew-1024x163.png.webp" 
          alt="Logo"
          height="40" // You can adjust the height as needed
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {auth && (
            <>
              <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
              <Nav.Link as={Link} to="/favorites">
                <FontAwesomeIcon icon={faHeart} /> {/* Heart icon for Favorites */}
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Nav.Link>
          {auth ? (
            <>
              <Dropdown alignRight>
                <Dropdown.Toggle variant="link" id="dropdown-basic">
                  <FontAwesomeIcon icon={faUser} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item disabled>Welcome, {auth.email}</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <Nav.Link as={Link} to="/login">
              <FontAwesomeIcon icon={faUser} />
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
