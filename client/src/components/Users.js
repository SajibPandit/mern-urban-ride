import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Layout from "./Layout";
import axios from "axios";

export default function Users() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {

    axios
      .get(`http://localhost:8000/api/user/all-user`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log('user',response.data.body.users);
        setOrders(response.data.body.users);
      })
      .catch(function (error) {
        // setError(error.response.data.body.message)
      });
  },[]);

  
  return (
    <Layout>
      <h2 className="text-center my-3">All Users</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.length > 0 &&
            orders.map((order) => (
              <tr>
                <td>{order._id}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.isAdmin ? "True" : "False"}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Layout>
  );
}
