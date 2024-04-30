import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/auth/login";
import ContactPage from "./pages/contact/view";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/contact"
            element={
              <ContactPage
                contact={{
                  name: "Daniel",
                  phone: "7182223333",
                  email: "dnls@gmail.com",
                  photo: "https://www.w3schools.com/w3css/img_avatar3.png",
                  internalId: "test-internalid",
                  id: "6MCTNNJOMVrajPEWqjAg",
                }}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
