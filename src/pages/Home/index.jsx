import React from "react";
import { Route, Routes} from "react-router-dom";
import Feed from "../Feed";
import Profile from "../Profile/index"

export default function Home(){
    return(<>
    
        <Routes>
            <Route component={Feed} path="/" exact/>
            <Route component={Profile} path="/profile" exact/>
        </Routes>
       
        </>
        
    )
}