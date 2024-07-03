import React, { useState, useEffect } from 'react';
import { fetchItems } from '../api';
import { Container, Row, Col } from 'react-bootstrap';
import Item from './Item';

const ItemList = ({ items }) => {
  return (
    <Container>
      <Row>
        {items.map(item => (
          <Col key={item.id} md={4}>
            <Item item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemList;
