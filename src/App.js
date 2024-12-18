import React from "react";
import "./App.css";
import Pages from "./Pages/Pages";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./AppContext/AppContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <AppContext>
          <Pages />
        </AppContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
