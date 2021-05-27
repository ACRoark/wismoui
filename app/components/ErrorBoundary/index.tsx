import * as React from 'react';

import ErrorView from './ErrorView';

export class ErrorBoundary extends React.PureComponent<{}> {
  // tslint:disable-next-line: typedef
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public componentDidCatch(error: Error | null, errorInfo: object): void {
    console.error(errorInfo, error);
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorView errorInfo={this.state.error} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
