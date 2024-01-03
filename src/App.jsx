import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ActivitiesProvider } from "./useActivities";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Activities } from "./Activities";

const App = () => {
  return (
    <ActivitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <div className="max-w-md min-h-screen mx-auto border border-slate-100">
                <Navbar />
                <Activities />
                <Footer />
              </div>
            }
          ></Route>
          <Route
            path="/activities"
            exact
            element={
              <div className="max-w-md mx-auto border border-slate-600">
                <Navbar />
                <Activities />
                <Footer />
              </div>
            }
          ></Route>
          <Route
            path="/activities/:id"
            exact
            element={
              <div className="max-w-md mx-auto border border-slate-600">
                <Navbar />
                <h1>Activity</h1>
              </div>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ActivitiesProvider>
  );
};

export default App;
