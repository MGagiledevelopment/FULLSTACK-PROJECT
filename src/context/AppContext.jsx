import { useState,createContext } from "react";

export const AppContext = createContext()

export const AppProvider  = (props) =>{
    const [text, setText] = useState("");
    const [tweets, setTweets] = useState([])
    const [user, setUser] = useState("");
    const [input, setInput] = useState("")
    const [customizer, setCustomizer] = useState("")
    const [widthCounter, setWidthCounter] = useState(0)
    const [data, setData] = useState([])
    const [usernames, setUsernames] =  useState("")
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState("")
    const [likes, setLikes] = useState([])
    const [isLiked, setIsLiked] = useState(false)
   


    return (
        <AppContext.Provider value={{ text,setText, tweets, setTweets,user, setUser,customizer, setCustomizer,input,setInput, widthCounter, setWidthCounter, data, setData,usernames,setUsernames,loading,setLoading, color, setColor, likes, setLikes, isLiked, setIsLiked}}>
            {props.children}
        </AppContext.Provider>
    );
}

