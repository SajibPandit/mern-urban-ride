import React from "react";
import { Col, Row } from "react-bootstrap";
import CardItem from "../components/Card";
import Layout from "../components/Layout";
import Bus from "../assets/bus.jpg";
import Bike from "../assets/bike.jpg";
import Car from "../assets/car.jpg";
import "../css/Home.css";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/destination");
  };
  return (
    <>
      {" "}
      <div className="home">
        <div className="container">
          <Row>
            <h2 className="text-center mt-3">Welcome to Urban Ride</h2>
            <p className="text-center mb-5">Select your desired vehicle</p>
            <Col md={4} sm={12}>
              <Link to="/destination">
                <CardItem onClick={handleClick} url={Bus} title="Bus" />
              </Link>
            </Col>

            <Col md={4} sm={12}>
              <Link to="/destination">
                <CardItem url={Bike} title="Bike" />
              </Link>
            </Col>

            <Col md={4} sm={12}>
              <Link to="/destination">
                <CardItem url={Car} title="Car" />
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
