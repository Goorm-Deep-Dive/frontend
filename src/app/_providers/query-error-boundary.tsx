"use client";

import CommonError from "@/components/common/error";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface InnerProps {
  children: ReactNode;
  resetQueries: () => void;
}

interface InnerState {
  error: Error | null;
}

/**
 * TanStack Query `throwOnError`로 전달된 에러를 잡아 {@link CommonError}를 표시한다.
 * `QueryErrorResetBoundary`와 함께 “다시 시도” 시 쿼리 상태를 리셋한다.
 */
class QueryErrorBoundaryInner extends Component<InnerProps, InnerState> {
  state: InnerState = { error: null };

  static getDerivedStateFromError(error: Error): InnerState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[QueryErrorBoundary]", error.message, info.componentStack);
  }

  handleRetry = () => {
    this.props.resetQueries();
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-5 py-12">
          <CommonError onRetry={this.handleRetry} />
        </div>
      );
    }

    return this.props.children;
  }
}

const QueryErrorBoundary = ({ children }: { children: ReactNode }) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <QueryErrorBoundaryInner resetQueries={reset}>
        {children}
      </QueryErrorBoundaryInner>
    )}
  </QueryErrorResetBoundary>
);

export default QueryErrorBoundary;
