import React, {useState} from "react";
import {useHistory} from "react-router-dom";

export const Search = ()=>{
    
    const history = useHistory();
    const [query, setQuery] = useState();
    
    return(

        <form className="form-inline my-2 my-lg-0" onSubmit={(e: any) => {
            history.push({pathname: "/pokemon", search: `?name=${query}`});
            e.preventDefault()
        }}>
            <input onChange={(e: any) => {
                setQuery(e.target.value)
            }} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button  type="submit"><span className="glyphicon glyphicon-search"/></button>
        </form>
    )
    
}