import React, { useState } from 'react';
import Dashboard from "./Dashboard"
import Login from "./components/Login/Login";

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  const [token, setToken] = useState();
  if(!token) {
    return(
    <BrowserRouter>
     <Switch>
          <Route path="/dashboard">
          <Login setToken={setToken} />
          </Route>
        </Switch>
    
    
    </BrowserRouter>
    
    )
  }
  return (
    <>
    <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
      
    </>
  );
};
export default App;
