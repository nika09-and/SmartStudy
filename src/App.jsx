import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./parts/header";
import "./App.css";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Create from "./pages/Create";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
