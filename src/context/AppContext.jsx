import { useState,createContext } from "react";

export const AppContext = createContext()

export const AppProvider  = (props) =>{
    const [text, setText] = useState("");
    const [tweets, setTweets] = useState([])
    const [user, setUser] = useState("");
    const [input, setInput] = useState("")
    const [customizer, setCustomizer] = useState("")


    return (
        <AppContext.Provider value={{ text,setText, tweets, setTweets,user, setUser,customizer, setCustomizer,input,setInput }}>
            {props.children}
        </AppContext.Provider>
    );
}
