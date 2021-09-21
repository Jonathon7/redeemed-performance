import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      {routes}
    </Router>
  );
}

export default App;
