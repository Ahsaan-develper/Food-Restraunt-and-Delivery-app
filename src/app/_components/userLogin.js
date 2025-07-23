import { useState } from "react"
import "./User.css"; 
import { useRouter } from "next/navigation";
export default function UserLogin (props){
    const [email,setEmail] = useState();   
    const [password,setPassword] = useState();   
    const router = useRouter();
    const handleLogin = async () => {
  let response = await fetch("http://localhost:3000/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  let data = await response.json();
console.log(data);

  if (data.success) {
    const {result} = data ;
    delete result.password;
   localStorage.setItem("customer",JSON.stringify(result));
   if (props?.redirect?.order){
    router.push("/order")
   }else{
   router.push("/")
   }
 
  } else {
    alert("Login failed ! Please check your email and password");
  }
};
     return (
       <div className="user-wrapper">
     
      <div className="user-form">
         <h1 className="form-heading">Customer Login </h1>
        <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <div>
          <button className="signup-btn" onClick={handleLogin}>Login </button>
        </div>
      </div>
    </div>
    )
}