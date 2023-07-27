import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import izitoast from "izitoast";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginData.password.length < 6) {
      setError("Password must be at least 6 characters");
    } else if (!loginData.email) {
      setError("Please enter valid email");
    } else {
      setError("");
      console.log(loginData);
      axios
        .post(
          "http://localhost:8000/api/user/login",
          {
            email: loginData.email,
            password: loginData.password,
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
            message: "Login successfull!",
            position: "bottomRight",
          });

          localStorage.setItem(
            "travel-helper-user",
            JSON.stringify(response.data)
          );
          navigate("/");
        })
        .catch(function (error) {
          setError(error.response.data.body.message)
        });
    }
  };
  return (
    <Layout>
      <Row>
        <Col md={6} sm={12} className="mx-auto">
          <h2 className="text-center mt-4">Login Page</h2>
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="Password"
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
