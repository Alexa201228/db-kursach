import React, {Fragment} from "react";
import MenuList from "./MenuList";
import {Route, Switch} from "react-router-dom";
import Services from "../components/services/Services";
import ServiceDetails from "../components/services/ServiceDetails";
import Films from "../components/films/Films";
import FilmDetail from "../components/films/FilmDetail";

export function MainPage(){

    return(
        <Fragment>
            <div className="container-fluid main">
            <div className="col-sm-2 area-left mt-5">
               <MenuList/>
            </div>
                <div className="col-sm-10 area-right float-right">
                        <Switch>
                            <Route exact path='/film/detail/:id' component={FilmDetail}/>
                            <Route exact path='/service/detail/:id' component={ServiceDetails}/>
                            <Route path='/service/detail/' component={Services}/>
                            <Route exact path='/film/detail/' component={Films}/>
                        </Switch>
                    </div>
            </div>
        </Fragment>
    )
}

export default MainPage;