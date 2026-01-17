import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./parts/header";
import "./App.css";
import Home from "./pages/Home";
import Library from "./pages/Library";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
