import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./layouts/Layouts";
import Register from "./pages/Register";
import Home from "./pages/Home";
import React from "react";
import SingIn from "./pages/SingIn";
import { useVerifyToken } from "./api/queryHooks/usersHook";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";

function App() {
  const [isHydration, setHydration] = React.useState(false);
  const { isLoading } = useVerifyToken();
  React.useEffect(() => {
    setHydration(true);
  }, []);

  if (!isHydration && !isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <div>hello</div>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <SingIn />
            </Layout>
          }
        />
        <Route
          path="/my-hotels"
          element={
            <Layout>
              <MyHotels />
            </Layout>
          }
        />
        <Route
          path="/add-hotel"
          element={
            <Layout>
              <AddHotel />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to={"/"} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
