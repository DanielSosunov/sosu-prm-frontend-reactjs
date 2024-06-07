import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/auth/login";
import ContactPage from "./pages/analytics/view";
import PaginatedElement from "./pages/analytics/paginatedelement";
import AddInteraction from "./pages/addinteraction/addinteraction";
import Reminders from "./pages/reminders/view";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/addinteraction" element={<AddInteraction />} />

          <Route path="/reminders" element={<Reminders />} />

          <Route path="/" element={<LoginForm />} />
          <Route path="/analytics" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
