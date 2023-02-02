import React from "react";
import { ErrorBoundaryProps, IErrorBoundaryState } from "../types/types";

class ErrorBoundary<T> extends React.Component<
  ErrorBoundaryProps<T>,
  IErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps<T>) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h2 className="text-2xl font-medium text-gray-700">
            Oops, there is an error!
          </h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-4"
          >
            Try again?
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
