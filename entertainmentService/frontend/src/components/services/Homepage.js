import React, {Fragment} from "react";
import MenuList from "./MenuList";
import {Container} from "@mui/material";
import {Route, Switch} from "react-router-dom";
import Services from "./Services";

export function MainPage(){

    return(
        <Fragment>
            <div className="container-fluid main">
            <div className="col-sm-2 area-left mt-5">
               <MenuList/>
            </div>
                <div className="col-sm-10 area-right float-right">
                        <Switch>
                            <Route path='/service/detail/' component={Services}/>
                        </Switch>
                    </div>
            </div>
        </Fragment>
    )
}

export default MainPage;