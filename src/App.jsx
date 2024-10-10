import "./App.css";
import { Navigator } from "./router/router";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { accessoriesData, phoneDataset } from "./data/data";
import { ThemeStore } from "./theme";
import { AuthProvider } from "./store/authContext";
function App() {
  useEffect(() => {
    // Check if the data does not exist in localStorage
    if (!localStorage.getItem("myData")) {
      // Store the data as a string in localStorage
      localStorage.setItem("myData", JSON.stringify(phoneDataset));
    }
    if (!localStorage.getItem("myAccessories")) {
      // Store the data as a string in localStorage
      localStorage.setItem("myAccessories", JSON.stringify(accessoriesData));
    }
  }, []);

  return (
    <AuthProvider>
      <ThemeStore>
        <Router>
          <Navigator />
        </Router>
      </ThemeStore>
    </AuthProvider>
  );
}

export default App;
