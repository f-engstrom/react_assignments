import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import RoutingPath from "./RoutingPath";

import {PokemonView} from "../views/PokemonView";
import {HomeView} from "../views/HomeView";

export const Routes = (props:any) => {
    
    
    
    return(
        <Router>
            {props.children}
            <Switch>
                <Route exact path={RoutingPath.PokemonView} component={PokemonView}/>
                <Route  path={RoutingPath.HomeView} component={HomeView}/>
            </Switch>
            
        </Router>
    )
}