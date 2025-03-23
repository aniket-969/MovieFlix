import  { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary"; 

const AppProvider = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  );
};
export default AppProvider