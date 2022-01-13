import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthLayer from "./layers/auth";
import { BrowserRouter as Router } from "react-router-dom";

const wrapper = document.getElementById("root");

if (wrapper) {
  ReactDOM.render(
    <Router>
      <AuthLayer>
        <App />
      </AuthLayer>
    </Router>,
    wrapper
  );
}

reportWebVitals();
