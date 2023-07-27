import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import Layout from "../components/Layout";
import Orders from "../components/Orders";
import Stat from "../components/Stat";
import Users from "../components/Users";

export default function Admin() {
  return (
    <Layout>
      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Dashboard">
          {/* <Sonnet /> */}
          <Stat/>
        </Tab>
        <Tab eventKey="profile" title="Orders">
          {/* <Sonnet /> */}
          <Orders/>
        </Tab>
        <Tab eventKey="contact" title="Users">
          {/* <Sonnet /> */}
          <Users/>
        </Tab>
      </Tabs>
    </Layout>
  );
}
