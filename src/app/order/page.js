"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/customerHeader";
import RestaurantFooter from "../_components/restrauntFooter";
import "./order.css";
import { Delivery_Charges, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

export default function Cartpage() {
    let customerdata=JSON.parse(localStorage.getItem("customer"))
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart")) 
  );
  const [total,setTotal]= useState(0);
  const router = useRouter();

  useEffect(()=>{
     let t=0;
    cartStorage.forEach ((item)=>{
        t +=  parseFloat(item.price)
    });
setTotal(t);
  },[cartStorage])


const handleAddorder =async ()=>{
  let city = JSON.parse(localStorage.getItem("customer")).city;
  let user_id = JSON.parse (localStorage.getItem("customer"))._id;
  let cart= JSON.parse(localStorage.getItem("cart"));
  let foodItemsId= cart.map((item)=>item._id).toString();
  let foodie_id= cart[0].foodie_id;
  let  deliveryBoy = await fetch("http://localhost:3000/api/deliverypartner/"+city);
  deliveryBoy= await deliveryBoy.json();
  let deliveryBoy_ids = deliveryBoy.result.map((item)=>item._id);
 let deliveryBoy_id= deliveryBoy_ids[Math.floor(Math.random() * deliveryBoy_ids.length)]
if (!deliveryBoy_id){
  alert("Delivery boy not available");
  return false;
}
console.log(deliveryBoy_id)

  let collection ={
    user_id,
    foodItemsId,
    foodie_id,
    deliveryBoy_id,
    status:"Confirm",
    amount:total + Delivery_Charges + (TAX * total)/100
  }
  console.log(collection)
  let response = await fetch('http://localhost:3000/api/order',{
    method:"Post",
    body:JSON.stringify(collection)
  });
  response = await response.json();
  if (response.success){
    alert("Order added")
    localStorage.removeItem("cart");
      router.push("/myprofile")
  }else{
    alert("Order failed")
  }
}
  return (
    <div>   <CustomerHeader />
      <div className="wrapper">
     
      {/* ✅ Charges Section */}
      <div className="summary">
        <div><h1>Customer details</h1></div>
        <div className="charge-items">
          <span>Name    :</span>
          <span> {customerdata.name}</span>
        </div>
        <div className="charge-items">
          <span>City    :</span>
          <span> {customerdata.city}</span>
        </div>
        <div className="charge-items">
          <span>Address   :</span>
          <span> {customerdata.address}</span>
        </div>
        <div className="charge-items">
          <span>Phone NO.   :</span>
          <span> {customerdata.phone}</span>
        </div>
         <div><h1>Order details</h1></div>
        <div className="charge-items">
          <span>Food Charges    :</span>
          <span>Rs. {total}</span>
        </div>
        <div className="charge-items">
          <span>Tax     :</span>
          <span>Rs. {(TAX * total)/100}</span>
        </div>
        <div className="charge-items">
          <span>Total Delivery Charges    :</span>
          <span>Rs. {Delivery_Charges}</span>
        </div>
        <div className="charge-items total">
          <span>Total Amount:</span>
          <span>Rs. {total + Delivery_Charges + (TAX * total)/100}</span>
        </div>
         <div><h1>Delivery details</h1></div>
         <div className="charge-items total">
          <span>Cash on Delivery:</span>
          <span>Rs. {total + Delivery_Charges + (TAX * total)/100}</span>
        </div>
        <button onClick={handleAddorder} >Place your order Now </button>
      </div>
    </div>
       <RestaurantFooter />
    </div>

  );
}
