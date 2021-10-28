import { useState,createContext } from "react";

export const AppContext = createContext()

export const AppProvider  = (props) =>{
    const [text, setText] = useState("");
    const [tweets, setTweets] = useState([])


    return (
        <AppContext.Provider value={{ text,setText, tweets, setTweets }}>
            {props.children}
        </AppContext.Provider>
    );
}
