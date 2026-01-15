import { useState } from "react";
import Header from "./parts/header";
import "./App.css";
import Button from "./components/button";

function App() {
  return (
    <div className="App">
      <Header />

      <div className="middle">
        <p className="mainText">
          Your Personal <br />
          <span className="studyAssistant">Study Assistant</span>
        </p>

        <p className="homeDescription">
          We’ll turn your subject it into a personalized study book with
          interactive quizzes and flashcards. Learn smarter, not harder.
        </p>

        <Button text="Add Subject" color="#6a5be2" />
      </div>
    </div>
  );
}

export default App;
