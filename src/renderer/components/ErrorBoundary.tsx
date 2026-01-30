import React from 'react';

type State = {
  hasError: boolean;
  message?: string;
};

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Bir hata oluştu</h2>
          <p>{this.state.message}</p>
          <p>Uygulama günlüklerini Diagnostics ekranından indirebilirsiniz.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
