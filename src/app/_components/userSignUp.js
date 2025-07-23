"use client"
import { useState } from "react";
import "./User.css"; // ✅ Add this line
import { redirect, useRouter } from "next/navigation";


export default function User(props) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cPassword, setCPassword] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const router = useRouter();
 const handleuserSignUp = async () => {
  let response = await fetch("http://localhost:3000/api/user", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      cPassword,
      city,
      address,
      phone,
    }),
  });

  let data = await response.json();

  if (data.success) {
    const {result} = data ;
    delete result.password;
    delete result.cPassword;
   localStorage.setItem("customer",JSON.stringify(result));
   if (props?.redirect?.order){
     router.push("/order")
   }else{
     router.push("/")
   }
   
  } else {
    alert("Sign Up failed");
  }
};


  return (  
      <div className="user-wrapper">
      
      <div className="user-form">
        <h1 className="form-heading">Customer Sign Up</h1>
        <input type="text" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm your Password" value={cPassword} onChange={(e) => setCPassword(e.target.value)} />
        <input type="text" placeholder="Enter your City" value={city} onChange={(e) => setCity(e.target.value)} />
        <input type="text" placeholder="Enter your Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input type="text" placeholder="Enter your Mobile No." value={phone} onChange={(e) => setPhone(e.target.value)} />
        <div>
          <button className="signup-btn" onClick={handleuserSignUp}>Sign Up</button>
        </div>
      </div>
    </div>

  );
}
