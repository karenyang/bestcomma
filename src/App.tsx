import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from "./containers/HomePage/index";
import AmorevinoPage from "./containers/AmorevinoPage/index";
import FobPage from "./containers/FobPage/index";
import CoffeevinePage from "./containers/CoffeevinePage/index";
import TestPage from "./containers/TestPage/index";
import MyloPage from "./containers/MyloPage/index";

import { Helmet } from 'react-helmet';


function App() {
  return (
    <div className="App">
      <Helmet>
        <link href='https://fonts.googleapis.com/css?family=Rowdies' rel='stylesheet'></link>

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-R09Q1HLZY2"></script>
        <script>
          {
          `
            window.dataLayer = window.dataLayer || [];
            function gtag() {dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-R09Q1HLZY2');
          `
          }

        </script>
      </Helmet>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/amorevino" component={AmorevinoPage} />
          <Route path="/functionofbeauty" component={FobPage} />
          <Route path="/hawaiigifts" component={TestPage} />
          <Route path="/coffeevine" component={CoffeevinePage} />
          <Route path="/mylo" component={MyloPage} />

        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
