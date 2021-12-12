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

export function MainPage(){

    return(
        <Fragment>
            <div className="container-fluid main">
            <div className="col-sm-2 area-left mt-5">
               <MenuList/>
            </div>
                <div className="col-sm-10 area-right float-right">
                        <Switch>

                            <Route exact path='/service/detail/:service_id' component={ServiceDetails}/>
                            <Route path='/service/detail/' component={Services}/>
                            <Route exact path='/film/detail/:film_id' component={FilmDetail}/>
                            <Route path='/film/detail/' component={Films}/>
                            <Route exact path='/series/detail/:serie_id' component={SeriesDetail}/>
                            <Route path='/series/detail/' component={Series}/>
                            <Route exact path='/game/detail/:game_id' component={GameDetail}/>
                            <Route path='/game/detail/' component={Games}/>
                            <Route exact path='/subscriptions/:subscription_id' component={SubscriptionDetail}/>
                            <Route path='/subscriptions/' component={Subscriptions}/>
                        </Switch>
                    </div>
            </div>
        </Fragment>
    )
}

export default MainPage;