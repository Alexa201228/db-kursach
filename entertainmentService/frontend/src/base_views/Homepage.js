import React, {Fragment} from "react";
import MenuList from "./MenuList";
import {Route, Switch} from "react-router-dom";
import Services from "../components/services/Services";
import ServiceDetails from "../components/services/ServiceDetails";
import Films from "../components/films/Films";
import FilmDetail from "../components/films/FilmDetail";
import Series from "../components/series/Series";
import SeriesDetail from "../components/series/SeriesDetail";
import Games from "../components/games/Games";
import GameDetail from "../components/games/GameDetail";
import Subscriptions from "../components/subscriptions/Subscriptions";
import SubscriptionDetail from "../components/subscriptions/SubscriptionDetail";
import PrivateRoute from "../components/common/PrivateRoute";

export function MainPage(){

    return(
        <Fragment>
            <div className="container-fluid main">
            <div className="col-sm-2 area-left mt-5">
               <MenuList/>
            </div>
                <div className="col-sm-10 area-right float-right">
                        <Switch>

                            <PrivateRoute exact path='/service/detail/:service_id' component={ServiceDetails}/>
                            <PrivateRoute path='/service/detail/' component={Services}/>
                            <PrivateRoute exact path='/film/detail/:film_id' component={FilmDetail}/>
                            <PrivateRoute path='/film/detail/' component={Films}/>
                            <PrivateRoute exact path='/series/detail/:serie_id' component={SeriesDetail}/>
                            <PrivateRoute path='/series/detail/' component={Series}/>
                            <PrivateRoute exact path='/game/detail/:game_id' component={GameDetail}/>
                            <PrivateRoute path='/game/detail/' component={Games}/>
                            <PrivateRoute exact path='/subscriptions/:subscription_id' component={SubscriptionDetail}/>
                            <PrivateRoute path='/subscriptions/' component={Subscriptions}/>
                        </Switch>
                    </div>
            </div>
        </Fragment>
    )
}

export default MainPage;