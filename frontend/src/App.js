import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Authenticate from "./components/shared/Authenticate/Authenticate";
import Activate from "./components/shared/Activate/Activate";
import Rooms from "./components/shared/Rooms/Rooms";
const isAuth = false;
const user = {
  activated: false,
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <GuestRoute>
                <Home />
              </GuestRoute>
            }
          ></Route>
          <Route
            path="/authenticate"
            element={
              <GuestRoute>
                <Authenticate />
              </GuestRoute>
            }
          ></Route>
          <Route
            path="/activate"
            element={
              <SemiProtectedArea>
                <Activate />
              </SemiProtectedArea>
            }
          ></Route>
          <Route
            path="/rooms"
            element={
              <ProtectedArea>
                <Rooms />
              </ProtectedArea>
            }
          ></Route>
          {/* <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const GuestRoute = ({ children }) => {
  const location = useLocation();

  return isAuth ? (
    <Navigate
      to={{
        pathname: "/rooms",
        state: { from: location },
      }}
    />
  ) : (
    children
  );
};
const SemiProtectedArea = ({ children }) => {
  const location = useLocation();

  return !isAuth ? (
    <Navigate
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  ) : isAuth && !user.activated ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  );
};

const ProtectedArea = ({ children }) => {
  const location = useLocation();
  return !isAuth ? (
    <Navigate
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  ) : isAuth && !user.activated ? (
    <Navigate
      to={{
        pathname: "/activate",
        state: { from: location },
      }}
    />
  ) : (
    children
  );
};

export default App;
