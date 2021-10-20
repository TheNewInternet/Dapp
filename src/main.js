import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { UseWalletProvider } from "use-wallet";

import Navbar from "./pages/navbar/Navbar";
import Product from "./pages/product/Product";
import Market from "./pages/market/Market";
import Home from "./pages/home/Home";
import Connect from "./pages/connect/Connect";
import Social from "./pages/social/Social";

function Main() {
  return (
    // <UseWalletProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/Product" exact component={Product} /> */}
          {/* <Route path="/Market" exact component={Market} /> */}
          <Route path="/Feeds" exact component={Social} />
          {/* <Route path="/Connect" exact component={Connect} /> */}
        </Switch>
      </Router>
    // </UseWalletProvider>
  );
}
export default Main;
