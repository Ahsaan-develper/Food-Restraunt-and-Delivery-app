"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

const RestrauntSignUp=()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [Cpassword,setCpassword] = useState("")
    const [name,setName] = useState("")
    const [city,setCity] = useState("")
    const [address,setAddress] = useState("")
    const [contact,setContact] = useState("")
    const router = useRouter()
    const [error,setError]=useState(false);
    const [passwordError,setPasswordError]=useState(false);
    const handleSignUp =async ()=>{
        if (password != Cpassword){
            setPasswordError(true)
        }else{
            setPasswordError(false)
        }
        if (!email || !password || !Cpassword || !name || !city || !address || !contact){
            setError(true);
        }else{
            setError(false)
              let response = await fetch("http://localhost:3000/api/restraunt",{
            method:"Post",
            body:JSON.stringify({name,password,Cpassword,email,city,address,contact})
        });
        response = await response.json();
     if ( response.success){
        const {result} = response;
        delete result.password;
        delete result.Cpassword;
        localStorage.setItem("restrauntUser",JSON.stringify(result));
        router.push("/restraunt/dashboard")
        alert("Restraunt Register successfully ")
     }else{
        alert("Registraion failed !")
     }
        }

      
    }

    return(
        <>
        <div className="signupForm">
        <div>
            <h1>Sign Up </h1>
            
                <input className="input-field" type="email" placeholder="Enter restraunt name  " value={name} onChange={(e)=>setName(e.target.value)}  required/>
                {
                    error && <span  className="error-text">Enter valid Email</span>
                }
                <input className="input-field" type="password" placeholder="Enter Password "value={password} onChange={(e)=>setPassword(e.target.value)}  required/>
                {
                    passwordError &&  <span className="error-text">Password do not match</span>
                }
                <input className="input-field" type="password" placeholder="Confirm Password " value={Cpassword} onChange={(e)=>setCpassword(e.target.value)} required/>
                {
                    passwordError &&  <span className="error-text">Password do not match</span>
                }
                <input className="input-field" type="text" placeholder="Enter email   " value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                 {
                    error && <span  className="error-text" >Enter valid name</span>
                }
                <input className="input-field" type="text" placeholder="Enter City " value={city} onChange={(e)=>setCity(e.target.value)} required/>
                 {
                    error && <span  className="error-text">Enter valid city name</span>
                }
                <input className="input-field" type="text" placeholder="Enter Full Address " value={address} onChange={(e)=>setAddress(e.target.value)} required/>
                 {
                    error && <span  className="error-text">Enter valid address</span>
                }
                <input className="input-field" type="text" placeholder="Enter Contact NO. " value={contact} onChange={(e)=>setContact(e.target.value)} required/>
                 {
                    error && <span  className="error-text">Enter valid contact no.</span>
                }
                <button onClick={handleSignUp} className="signupbtn">Sign Up</button>
            </div>
        </div>
        </>
    )
}
export  default RestrauntSignUp;