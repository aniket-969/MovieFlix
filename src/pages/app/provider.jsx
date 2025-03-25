import { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import SpinnerComponent from "./../../components/UI/spinner";

const AppProvider = ({ children }) => {
  return (
    <Suspense fallback={<SpinnerComponent message="Loading..." />}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  );
};
export default AppProvider;
