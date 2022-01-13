import "./App.css";
import * as ROUTES from "./utils/routes";
import { AuthConsumer, ProtectedRoute } from "./layers/auth";
import { Route, Routes } from "react-router-dom";
import Metamask from "./pages/metamask";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <div className="App">
      <AuthConsumer>
        {(authState) => (
          <Routes>
            <Route path={ROUTES.METAMASK} element={<Metamask />} />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute
                  path={ROUTES.DASHBOARD}
                  component={<Dashboard />}
                />
              }
            />
          </Routes>
        )}
      </AuthConsumer>
    </div>
  );
}

export default App;
