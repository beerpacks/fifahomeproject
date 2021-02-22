import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SiteRoutes } from './sitesroutesmap';

function App() {
  return (
    <BrowserRouter>
      <Route render={() => {
        return <Switch>
          <Route exact path={SiteRoutes.squadsPage.path} component={SiteRoutes.squadsPage.component} />
          <Route exact path={SiteRoutes.editPlayerPage.path} component={SiteRoutes.editPlayerPage.component} />
          <Route exact path={SiteRoutes.newPlayerPage.path} component={SiteRoutes.newPlayerPage.component} />
        </Switch>
      }} />
    </BrowserRouter>
  )
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
