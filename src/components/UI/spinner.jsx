import React from "react";
import { Spinner } from "react-bootstrap";

const SpinnerComponent = ({ variant = "danger", size = "md", message = "" }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-4">
      <Spinner animation="border" variant={variant} size={size} role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default SpinnerComponent;
