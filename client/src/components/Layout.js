import { Container } from "react-bootstrap";

export default function Layout(props) {
  return (
    <>
    <Container style={{ minHeight: "80vh" }}>
        {props.children}
    </Container>
    </>
  )
}
