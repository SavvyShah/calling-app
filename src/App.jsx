import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <h1>Home</h1>
              </>
            }
          ></Route>
          <Route
            path="/activities"
            exact
            element={
              <>
                <h1>Activities</h1>
              </>
            }
          ></Route>
          <Route
            path="/activities/:id"
            exact
            element={
              <>
                <h1>Activity</h1>
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
