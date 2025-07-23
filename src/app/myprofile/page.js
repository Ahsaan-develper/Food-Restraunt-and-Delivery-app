"use client"
import "./myprofile.css"
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/customerHeader";
import RestaurantFooter from "../_components/restrauntFooter";


export default function MyProfile (){
    const [myOrders,setMyOrders] = useState([]);
    useEffect(()=>{
        LoadMyorders();
    },[]);

    const LoadMyorders = async()=>{
     const user = JSON.parse(localStorage.getItem("customer"));
  const response = await fetch(`http://localhost:3000/api/order?id=${user._id}`);
  const data = await response.json();

  if (data.success) {
    setMyOrders(data.result);
  }
    }
    
    return (
        <div>
            <CustomerHeader />
        {
         <div className="order-container">
  <h2 className="order-heading">My Orders</h2>

  {myOrders.length === 0 ? (
    <p>No orders found.</p>
  ) : (
    myOrders.map((item) => (
      <div key={item._id} className="order-card">
        <h3>Name: {item.data.name}</h3>
        <p><strong>Amount:</strong> Rs. {item.amount}</p>
        <p><strong>Address:</strong> {item.data.address}</p>
        <p><strong>Status:</strong> {item.status}</p>
      </div>
    ))
  )}
</div>

        }
            <RestaurantFooter />
        </div>
    )
}