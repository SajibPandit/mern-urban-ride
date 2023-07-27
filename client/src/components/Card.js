import React from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card'

export default function CardItem({url,title}) {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title style={{ textDecoration:'none' }} className='text-center'>{title}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}
