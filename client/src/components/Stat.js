import React, { useEffect ,useState} from "react";
import { Card, Col, Row } from "react-bootstrap";
import CountUp from "react-countup";
import axios from "axios";

export default function Stat() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/statistics`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response.data.body);
        setData(response.data.body)
      })
      .catch(function (error) {
        // setError(error.response.data.body.message)
      });
  }, []);
  return (
    <>
      <Row>
        <Col>
          <center>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <center>
                  <Card.Title>Total Users</Card.Title>
                </center>
                <center>
                  <Card.Subtitle
                    style={{ fontSize: "30px", fontWeight: "bold" }}
                    className="mb-2 text-muted"
                  >
                    <CountUp duration={0.75} end={data.users} />
                  </Card.Subtitle>
                </center>
              </Card.Body>
            </Card>
          </center>
        </Col>

        <Col>
          <center>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <center>
                  <Card.Title>Total Orders</Card.Title>
                </center>
                <center>
                  <Card.Subtitle
                    style={{ fontSize: "30px", fontWeight: "bold" }}
                    className="mb-2 text-muted"
                  >
                    <CountUp duration={0.75} end={data.orders} />
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
