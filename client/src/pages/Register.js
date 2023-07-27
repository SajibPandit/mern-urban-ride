import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
// import AlertMessage from "../components/Alert";
import Layout from "../components/Layout";
import izitoast from "izitoast";

import axios from "axios";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      registerData.password.length < 6 ||
      registerData.confirmPassword.length < 6
    ) {
      setError("Password must be at least 6 characters");
    } else if (registerData.password !== registerData.confirmPassword) {
      setError("Password not matched");
    } else {
      setError("");
      console.log(registerData);

      axios
        .post(
          "http://localhost:8000/api/user/register",
          {
            email: registerData.email,
            password: registerData.password,
            name: registerData.name,
            phone: registerData.phone,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          console.log(response.data);

          localStorage.setItem(
            "travel-helper-user",
            JSON.stringify(response.data)
          );
          setRegisterData({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          });
          izitoast.success({
            title: "Success",
            message: "Reqistration successfull!",
            position: "bottomRight",
          });
        })
        .catch(function (error) {
          setError(error.response.data.body.message);
        });
    }
  };
  return (
    <Layout>
      <Row>
        <Col md={6} sm={12} className="mx-auto">
          <h2 className="text-center mt-4">Register Page</h2>
          {/* {isLoading && (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )} */}

          {error && (
            <Alert className="text-center" variant="danger">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="Enter a secure password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                onChange={handleChange}
                type="password"
                placeholder="Confirm your password"
                required
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
            <Button className="w-100 mt-3 mb-5" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}
