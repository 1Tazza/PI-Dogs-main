import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home"
import Detalle from "./Components/Detalle/Detalle"
import Landing  from "./Components/Landing/Landing";
import CreateDog from "./Components/CreateDog/CreateDog";
import Nav from "./Components/Nav/Nav";
function  App() {
  return (
    <div className="App">
     
      <Route component={Landing} exact path="/"/>
      <Route component={Nav} path="/home"/>
      <Route component={Home} exact path="/home"/>
      <Switch>
      <Route component={CreateDog} path="/dog/createDog"/>
      <Route component={Detalle} path="/dog/:dogId"/>
      </Switch>
     
    </div>
  );
}

export default App;
