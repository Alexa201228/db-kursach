import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Registration from "./components/account/Registration";
import Login from "./components/account/Login";
import {store} from "./store";
import {Provider} from "react-redux";
import Services from "./components/services/Services";
import Header from "./base_views/Header";

function App() {
  return (
    <div className="App">
        <Header/>
        <Provider store={store}>
            <Router>
                <Routes>
                   <Route path='/register' element={<Registration/>}/>
                    <Route path='/' element={<Services/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </Router>

        </Provider>
    </div>
  );
}

export default App;
