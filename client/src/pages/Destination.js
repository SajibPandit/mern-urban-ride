import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import Calculations from "../components/Calculations";
import { useNavigate } from "react-router-dom";
// const distFrom = require("distance-from");
import izitoast from "izitoast";
import GoogleMap from "../components/GoogleMap";

export default function Destination() {
  const [districts, setDistricts] = useState([]);
  const [user, setUser] = useState(null);

  const [distance, setDistance] = useState(null);
  const [totalCost, setTotalCost] = useState(null);

  const [medium, setMedium] = useState(null);
  const [person, setPerson] = useState(1);
  const [fromData, setFromData] = useState({
    district: "",
    lat: "",
    lng: "",
  });
  const navigate = useNavigate();

  console.log(medium);

  const [toData, setToData] = useState({
    district: "",
    lat: "",
    lng: "",
  });

  // if (fromData.coordinates && toData.coordinates) {
  //   const d = distFrom(fromData.coordinates).to(toData.coordinates).in("mi");
  //   console.log(d);
  // }

  const optionsForDistricts = {
    method: "GET",
    url: "https://bdapi.p.rapidapi.com/v1.1/districts",
    headers: {
      "X-RapidAPI-Host": "bdapi.p.rapidapi.com",
      "X-RapidAPI-Key": "73c0ddc081msh5d4b38121d992e7p1f0deejsn3bd4dba4640a",
    },
  };
  console.log(districts);
  useEffect(() => {
    axios
      .request(optionsForDistricts)
      .then(function (response) {
        setDistricts(response.data.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("travel-helper-user");
    console.log(user);

    const token = JSON.parse(user);
    console.log("ser", token);
    setUser(token);
  }, []);

  const handleSelectFrom = (e) => {
    const data = e.target.value.split(",");
    setFromData({
      district: data[0],
      lat: data[1],
      lng: data[2].trim(),
    });
  };

  const handleSelectTo = (e) => {
    const data = e.target.value.split(",");
    setToData({
      district: data[0],
      lat: data[1],
      lng: data[2].trim(),
    });
  };
  

  const handleConfirmOrder = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/order",
        {
          from: fromData.district,
          destination: toData.district,
          distance: distance,
          totalCost: totalCost,
          user: user._id,
          phone: user.phone,
          totalPerson: person,
          medium: medium,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        izitoast.success({
          title: "Success",
          message: "Order Created!",
          position: "bottomRight",
        });
      })
      .catch(function (error) {
        // setError(error.response.data.body.message)
      });
  };

  // if (fromData.lat && toData.lat) {
  //   const dist = getDistanceFromLatLonInKm(
  //     fromData.lat,
  //     fromData.lng,
  //     toData.lat,
  //     toData.lng
  //   );
  //   setDistance(dist);
  // }

  const handleSelectMedium = (e) => {
    setMedium(e.target.value);
  };

  // console.log(fromData);
  // console.log(distance);
  return (
    <>
      <Layout>
        <Row>
          <Col md={6} sm={12}>
            <Form.Label>From</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleSelectFrom}
            >
              <option>From</option>
              {districts.map((d, i) => {
                return (
                  <option key={i} value={`${d.district},${d.coordinates}`}>
                    {d.district}
                  </option>
                );
              })}
              {/* <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option> */}
            </Form.Select>
          </Col>
          <Col md={6} sm={12}>
            <Form.Label>To</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleSelectTo}
            >
              <option>To</option>
              {districts.map((d, i) => {
                return (
                  <option key={i} value={`${d.district},${d.coordinates}`}>
                    {d.district}
                  </option>
                );
              })}
              {/* <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option> */}
            </Form.Select>
          </Col>

          <Col md={6} sm={12}>
            <Form.Label>Medium</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleSelectMedium}
            >
              <option>Medium</option>

              <option value="car">Car</option>
              <option value="bus">Bus</option>
              <option value="bike">Bike</option>
              <option value="cng">CNG</option>
            </Form.Select>
          </Col>

          <Col md={6} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Total Person</Form.Label>
              <Form.Control
                value={person}
                onChange={(e) => setPerson(e.target.value)}
                min={1}
                type="number"
                placeholder="Password"
              />
            </Form.Group>
          </Col>
        </Row>
        {/* <Calculations/> */}
        {fromData.lat && toData.lat && medium && person && (
          <>
            <Calculations
              fromData={fromData}
              toData={toData}
              medium={medium}
              person={person}
              distance={distance}
              totalCost={totalCost}
              setDistance={setDistance}
              setTotalCost={setTotalCost}
            />
            <GoogleMap fromData={fromData} toData={toData} />
            <center>
              <Button className="my-5" onClick={handleConfirmOrder}>Confirm Order</Button>
            </center>
          </>
        )}
      </Layout>
    </>
  );
}
