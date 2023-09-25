import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error or perform other error handling tasks here
    console.error('Error in component:', error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render an error message or a fallback UI here
      return <div>Something went wrong. Please try again later.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
