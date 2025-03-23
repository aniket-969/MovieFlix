import  { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import Spinner from "../../components/UI/spinner"; 

export const AppProvider = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner />
        </div>
      }
    >
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  );
};
