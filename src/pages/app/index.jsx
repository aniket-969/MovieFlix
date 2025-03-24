import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import AppProvider from "./provider";
import AppRouter from "./router";
import { ThemeProvider } from "../../context/ThemeContext";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <>
    
        <AppProvider>
          <AppRouter />
        </AppProvider>
    </>
  );
}

export default App;
