import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  Navbar,
  Welcome,
  Footer,
  Services,
  Transactions,
} from "./components/index";

const App = () => {
  return (
    <BrowserRouter>
      <div className="h-screen">
        <div className="gradient-bg-welcome">
          <Navbar />
          <Welcome />
        </div>
        <Services />
        <Transactions />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
