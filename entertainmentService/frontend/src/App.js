import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Registration from "./components/account/Registration";
import Login from "./components/account/Login";
import {store} from "./store";
import {Provider} from "react-redux";
import Header from "./base_views/Header";
import Homepage from "./base_views/Homepage";
import React, {useEffect} from "react";
import {loadUser} from "./actions/auth";
import {createTheme, ThemeProvider} from "@mui/material";


function App() {

    useEffect(() => {
       store.dispatch(loadUser())
    }, [])
    const theme = createTheme()
  return (
      <ThemeProvider theme={theme}>
    <div className="App">
        <Provider store={store}>
            <Router>
                <Header/>
                <Homepage/>
                <Switch>
                   <Route path='/register' component={Registration}/>
                    <Route path='/login' component={Login}/>
                </Switch>
            </Router>
        </Provider>
    </div>
      </ThemeProvider>
  );
}

export default App;
