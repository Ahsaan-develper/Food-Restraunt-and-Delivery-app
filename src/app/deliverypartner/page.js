"use client"
import { useRouter } from "next/navigation";
import DeliveryHeader from "../_components/deliverHeader";
import RestaurantFooter from "../_components/restrauntFooter";
import "./deliverypartner.css"
import { useEffect, useState } from "react";
export default function DeliveryPartner(){
    const [loginMobile,setLoginMobile] = useState();   
    const [loginPassword,setLoginPassword] = useState();   
const  [name, setName] = useState();
  const [password, setPassword] = useState();
  const [cPassword, setCPassword] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const router = useRouter();

useEffect((item)=>{
  let storage = JSON.parse(localStorage.getItem("delivery"));
  if (storage){
    router.push("/deliverydashboard");
  }
},[])

const handleLogin = async () => {
  let response = await fetch("http://localhost:3000/deliverypartner/login", {
    method: "POST",
    body: JSON.stringify({
      phone:loginMobile,
      password:loginPassword,
    })
  });

  let data = await response.json();
console.log(data);

  if (data.success) {
    const {result} = data ;
    delete result.password;
   localStorage.setItem("delivery",JSON.stringify(result));
    router.push("/deliverydashboard")
  } else {
    alert("Login failed ! Please check your email and password");
  }
};

  const handleuserSignUp = async () => {
  let response = await fetch("http://localhost:3000/deliverypartner/signup", {
    method: "POST",
    body: JSON.stringify({
      name,
       phone,
      password,
      city,
      address,
    }),
  });

  let data = await response.json();

  if (data.success) {
    const {result} = data ;
    delete result.password;
    delete result.cPassword;
   localStorage.setItem("delivery",JSON.stringify(result));
       router.push("/deliverydashboard")
};
  }
    return (
      <div>
        <DeliveryHeader />
  <div className="form-wrapper">
  
    <div className="user-form">
      <h1 className="form-heading">Customer Login</h1>
      <input
        type="text"
        placeholder="Enter your mobile"
        value={loginMobile}
        onChange={(e) => setLoginMobile(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>

    <div className="user-form">
      <h1 className="form-heading">Customer Sign Up</h1>
      <input
        type="text"
        placeholder="Enter your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your Mobile No."
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleuserSignUp}>Sign Up</button>
    </div>
    
  </div>
  <RestaurantFooter />
  </div>
);

} 