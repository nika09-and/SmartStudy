import { useState } from "react";
import Header from "./parts/header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <p className="mainText">Your Personal <br /><span className="studyAssistant">Study Assistant</span></p>
    </div>
  );
}

export default App;
