import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./layouts/Layouts";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <div>hello</div>
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
        <Route path="*" element={<Navigate to={"/"} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
