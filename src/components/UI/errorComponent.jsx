import React from "react";
import { Alert, Container } from "react-bootstrap";

const ErrorComponent = ({ message = "Something went wrong!", variant = "danger" }) => {
  return (
    <Container className="mt-5">
      <Alert variant={variant}>
        <Alert.Heading>Error</Alert.Heading>
        <p>{message}</p>
      </Alert>
    </Container>
  );
};

export default ErrorComponent;
