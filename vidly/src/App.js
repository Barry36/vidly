import React from "react";
import "./App.css";
import Movies from "./component/movies";
import Navbar from "./component/navbar";
function App() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <main className="container">
        <Movies></Movies>
      </main>
    </React.Fragment>
  );
}

export default App;
