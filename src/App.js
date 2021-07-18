import React from 'react'
// import {Switch,Route,BrowserRouter, Redirect} from "react-router-dom"
import Feed from "./components/Feed"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom"
import { useContext } from 'react';
var isSignedUp=  true ;
function App() {
  return (
    <Router>
    <AuthProvider>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <PrivateRoute path="/" exact Comp={Feed}></PrivateRoute>
          </Switch>
            </AuthProvider>
        </Router>
  )
    
}

function PrivateRoute(parentProps){
// console.log(parentProps);
// console.log(isSignedUp);
let {currentUser} = useContext(AuthContext);

  const Component=parentProps.Comp;
  console.log(Component);
  return (
    <Route {...parentProps} render={
      (parentProps) => {
        // isSignedUp===true ?
        if(currentUser!=null){
          console.log("fnj");
         return  <Component {...parentProps}></Component>
        } else {
          return <Redirect to="/login"></Redirect>
        }  
      }
    }></Route>
  )
    
}

export default App;