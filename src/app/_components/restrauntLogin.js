"use client"
import { useRouter } from 'next/navigation';
import './style.css'
import { useState } from "react";

const RestrauntLogin=()=>{
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [error,seterror] = useState(false)
    const router = useRouter()
    const handleLogin= async()=>{

        if (!email || !password){
            seterror(true)
        }else{
            seterror(false)
        }
        let data = await fetch("http://localhost:3000/api/restraunt",{
            method:"Post",
            body:JSON.stringify({email,password,login:true})
        });
        data = await data.json();
        
        if (data.success){
            const {result} = data;
            delete data.password
            localStorage.setItem("restrauntUser",JSON.stringify(result));
            router.push("/restraunt/dashboard")
        }else{
            alert("Login failed")
            router.push("/restraunt")
        }
    }
    return (
        <>
        <div className="loginFormWrapper">
        <div className="loginForm">
        <h1>Login Your Account</h1>      
            <input className="input-field" type="email" placeholder="Enter email id here " value={email} onChange={((e)=>setEmail(e.target.value))} required />
            {
                error && <span className="error-text" >Enter valid email</span>
            }
            <input className="input-field" type="password" placeholder="Enter password here " value={password} onChange={((e)=>setPassword(e.target.value))} required />
            {
                error && <span className="error-text" >Enter valid password</span>
            }
            <button className="loginbtn" onClick={handleLogin}>Login</button>
        </div>
        </div>
        </>
    )
}
export default RestrauntLogin;