import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Login/SignUp";
import Protected from "./Pages/Login/Protected";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              {" "}
              <Home />{" "}
            </Protected>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
