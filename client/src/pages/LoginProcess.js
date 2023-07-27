import React from "react";
import { Button } from "react-bootstrap";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function LoginProcess() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <Layout>
      <>
        <div style={{ width : '100%', height : '80vh'}} className="d-flex justify-content-center align-items-center">
          <Button className="m-3" onClick={handleClick}>Login as a User</Button>
          <Button className="m-3" onClick={handleClick}>Login as a Rider</Button>
        </div>
      </>
    </Layout>
  );
}
