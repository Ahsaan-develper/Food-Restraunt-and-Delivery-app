"use client"
import { useState } from "react";
import RestrauntLogin from "../_components/restrauntLogin";
import RestrauntSignUp from "../_components/restrauntSignUP";
import RestrauntHeader from "../_components/restrauntHeader";
import RestaurantFooter from "../_components/restrauntFooter";

const Restraunt =()=>{
    const [login,setLogin] = useState(true)
    return (
        <>
       
        <div>
             <RestrauntHeader />
            <h1 className="restraunt">Restraunt Login or Sign Up Page</h1>
            {
                login ?<RestrauntLogin />: <RestrauntSignUp  />
            }
       <button className="toggle-btn" onClick={()=>setLogin(!login)}>{login ? "Do no have account Sign Up": "Have account Login"}</button>
        </div>
        <RestaurantFooter />
        </>
        
    )
}
export default Restraunt;