import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { getDistanceFromLatLonInKm, getTotalCost } from "./getDIstance";
import CountUp from "react-countup";

export default function Calculations({
  fromData,
  toData,
  medium,
  person,
  distance,
  totalCost,
  setDistance,
  setTotalCost,
}) {
  useEffect(() => {
    const dist = getDistanceFromLatLonInKm(
      fromData.lat,
      fromData.lng,
      toData.lat,
      toData.lng
    );
    setDistance(dist.toFixed(0));
    console.log(dist);

    const cost = getTotalCost(distance, medium, person);
    setTotalCost(cost);
  }, [fromData, toData, distance, medium, person]);

  if (distance) {
    console.log(distance);
  }
  
  
  return (
    <>
      <Row>
        <Col>
          {distance && (
            <center>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <center>
                    <Card.Title>Total Distance</Card.Title>
                  </center>
                  <center>
                    <Card.Subtitle
                      style={{ fontSize: "30px", fontWeight: "bold" }}
                      className="mb-2 text-muted"
                    >
                      <CountUp duration={0.75} end={distance} /> Kilometers
                    </Card.Subtitle>
                  </center>
                </Card.Body>
              </Card>
            </center>
          )}
        </Col>
        <Col>
          {totalCost && (
            <center>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <center>
                    <Card.Title>Total Cost</Card.Title>
                  </center>
                  <center>
                    <Card.Subtitle
                      style={{ fontSize: "30px", fontWeight: "bold" }}
                      className="mb-2 text-muted"
                    >
                      <CountUp duration={0.75} end={totalCost} /> Taka
                    </Card.Subtitle>
                  </center>
                </Card.Body>
              </Card>
            </center>
          )}
        </Col>

        <Col>
            <center>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <center>
                    <Card.Title>Total Available Vehicle</Card.Title>
                  </center>
                  <center>
                    <Card.Subtitle
                      style={{ fontSize: "30px", fontWeight: "bold" }}
                      className="mb-2 text-muted"
                    >
                      <CountUp duration={0.75} end={9} />
                    </Card.Subtitle>
                  </center>
                </Card.Body>
              </Card>
            </center>
        </Col>


      </Row>
    </>
  );
}
