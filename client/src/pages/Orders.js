import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Layout from "../components/Layout";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("travel-helper-user");

    const data = JSON.parse(user);
    console.log(data);
    // setData(data)

    axios
      .get(`http://localhost:8000/api/user/orders/${data._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response.data.body.orders);
        setOrders(response.data.body.orders);
      })
      .catch(function (error) {
        // setError(error.response.data.body.message)
      });
  },[]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/order/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response.data);
        window.location.reload(true);
      })
      .catch(function (error) {
        // setError(error.response.data.body.message)
      });
  };
  return (
    <Layout>
      <h2 className="text-center my-3">Your Orders</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>From</th>
            <th>Destination</th>
            <th>Distance</th>
            <th>Cost</th>
            <th>Medium</th>
            <th>Person</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.length > 0 &&
            orders.map((order) => (
              <tr>
                <td>{order._id}</td>
                <td>{order.from}</td>
                <td>{order.destination}</td>
                <td>{order.distance}</td>
                <td>{order.totalCost}</td>
                <td>{order.medium}</td>
                <td>{order.totalPerson}</td>
                <td>{order.phone}</td>
                <td>
                  <Button onClick={()=>handleDelete(order._id)}>Cancel</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Layout>
  );
}
