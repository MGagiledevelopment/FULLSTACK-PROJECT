import { useState,createContext } from "react";

export const AppContext = createContext()

export const AppProvider  = (props) =>{
    const [text, setText] = useState("FUNCIONO EL NOMBRE");

    return (
        <AppContext.Provider value={{ text,setText }}>
            {props.children}
        </AppContext.Provider>
    );
}
