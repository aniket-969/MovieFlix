import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center px-3">
          <h3 className="text-danger">Something went wrong.</h3>
          <p className="text-muted">{this.state.error?.message || "An unexpected error occurred."}</p>
          <button className="btn btn-primary mt-3" onClick={this.handleReset}>
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
