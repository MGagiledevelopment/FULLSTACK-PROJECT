import { useState,createContext } from "react";

export const AppContext = createContext()

export const AppProvider  = (props) =>{
    const [text, setText] = useState("");
    const [tweets, setTweets] = useState([])
    const [user, setUser] = useState()


    return (
        <AppContext.Provider value={{ text,setText, tweets, setTweets,user, setUser }}>
            {props.children}
        </AppContext.Provider>
    );
}
