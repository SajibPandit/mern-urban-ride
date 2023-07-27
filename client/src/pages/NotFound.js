import React from "react";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import NotFoundSvg from "../assets/notfound.svg";

export default function NotFound() {
  return (
    <>
      <Container>
       <center>
       <Image className="img-fluid mt-3" src={NotFoundSvg} />
       </center>
      </Container>
    </>
  );
}
