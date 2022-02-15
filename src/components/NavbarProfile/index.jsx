import React, { useEffect, useContext } from "react";
import { Logout } from "../../services/logout";



export default function NavbarProfile(){

    const handleLogout = async () =>{
        await Logout()
        history.push('/')
    }

    return(
        <nav>
    <div>
        <button onClick={handleLogout}>LogOut</button>
    </div>

        </nav>
    )
}