import { useState,createContext } from "react";

export const AppContext = createContext()

export const AppProvider  = (props) =>{
    const [name, setName] = useState("");

    return (
        <AppContext.Provider value={{name,setName}}>
            {props.children}
        </AppContext.Provider>
    );
}
