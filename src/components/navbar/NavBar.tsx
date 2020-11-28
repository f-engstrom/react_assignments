import React from "react";
import {NavLink} from "react-router-dom";
import RoutingPath from "../../Routes/RoutingPath";
import './NavBar.css'


export const NavBar = () => {


    return (

        <div>

            <nav className="upper-nav navbar justify-content-center  ">

                <NavLink to={RoutingPath.HomeView}><img
                    src="https://fontmeme.com/permalink/201128/be89006e74d01cae587730bdb91f2c3a.png" alt="pokemon-font"
                    /></NavLink>

            </nav>
            <nav className="lower-nav ">
                <NavLink className="navlink" to={RoutingPath.HomeView}>Home</NavLink>

                <NavLink className="navlink" to={RoutingPath.PokemonView}>Pokemon</NavLink>

            </nav>
        </div>

    );
}