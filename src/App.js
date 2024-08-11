import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/auth/login";
import ContactPage from "./pages/analytics/view";
import PaginatedElement from "./pages/analytics/paginatedelement";
import AddInteraction from "./pages/addinteraction/addinteraction";
// import Reminders from "../../archived/frontend/reminders/view";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/addinteraction" element={<AddInteraction />} />

          {/* <Route path="/reminders" element={<Reminders />} /> */}

          <Route path="/" element={<LoginForm />} />
          <Route path="/analytics" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
// import React from "react";
// import SingleInteraction from "./pages/analytics/singleinteraction";

// const data = [
//   {
//     contact: "Carlos Whitt",
//     time: 1628516580000, // Unix timestamp example
//     method: "Phone",
//     sentiment: "Positive",
//     purpose: "Business",
//     initiatedBy: "Me",
//     diary:
//       "The KBD67 Lite is not just a good value, it’s an amazing keyboard. I love the feel and the build quality.",
//     avatar: "https://via.placeholder.com/40", // Replace with actual avatar URL
//   },
//   {
//     contact: "Necati Koçlu",
//     time: 1628520240000, // Unix timestamp example
//     method: "Message",
//     sentiment: "Neutral",
//     purpose: "Personal",
//     initiatedBy: "They",
//     diary: "",
//     avatar: "https://via.placeholder.com/40", // Replace with actual avatar URL
//   },
//   {
//     contact: "Quality Boards",
//     time: 1628523840000, // Unix timestamp example
//     method: "In Person",
//     sentiment: "Negative",
//     purpose: "Not Personal",
//     initiatedBy: "Me",
//     diary:
//       "After researching, I found that the KBD75 V2 offers the best of both worlds for typing and gaming.",
//     avatar: "https://via.placeholder.com/40", // Replace with actual avatar URL
//   },
//   // Add more data items as needed
// ];

// const App = () => {
//   const containerStyle = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     // padding: "20px",
//     gap:"10px",
//     height: "100vh",
//     overflowY: "auto",
//     backgroundColor: "#f0f0f0",
//   };

//   return (
//     <div style={containerStyle}>
//       {data.map((item, index) => (
//         <SingleInteraction
//           key={index}
//           contact={item.contact}
//           time={item.time}
//           method={item.method}
//           sentiment={item.sentiment}
//           purpose={item.purpose}
//           initiatedBy={item.initiatedBy}
//           diary={item.diary}
//           avatar={item.avatar}
//         />
//       ))}
//     </div>
//   );
// };

// export default App;
