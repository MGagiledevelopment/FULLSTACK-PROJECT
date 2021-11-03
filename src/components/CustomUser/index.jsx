import React,{useContext} from 'react';
import { AppContext } from "../../context/AppContext";

export default function CustomUser (){
    const { customizer ,setCustomizer} = useContext(AppContext)
    const {input, setInput} = useContext(AppContext)


  const handleInput = (e) => {
 setInput(e.target.value)
  }

    const handleButton = () =>{
        setCustomizer(input)
    }

    return(

        <div>
            <form><input type="text" onChange={handleInput}/> 
            <button onClick={handleButton}>CONTINUAR</button></form>
            
            </div>
        

    )

}