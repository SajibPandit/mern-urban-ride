import { useState } from "react";
import Alert from "react-bootstrap/Alert";

export default function AlertMessage({ variant, content }) {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <>
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          <p>{content}</p>
        </Alert>
      </>
    );
  }
}
