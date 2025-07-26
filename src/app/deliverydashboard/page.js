"use client";
import { useRouter } from "next/navigation";
import DeliveryHeader from "../_components/deliverHeader";
import RestaurantFooter from "../_components/restrauntFooter";
import "./deliverydashboard.css"
import { useEffect, useState } from "react";

export default function DeliveryDashboard() {
  const [myOrders, setMyOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("delivery"));

    if (!user) {
      router.push("/deliverypartner");
    } else {
      loadMyOrders(user._id);
    }
  }, []);

  const loadMyOrders = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/deliverypartner/orders/${id}`);
      const data = await res.json();

      // 🔍 If result is object, convert to array
      const orders = Array.isArray(data.result)
        ? data.result
        : Object.values(data.result);

      setMyOrders(orders);
    } catch (err) {
      console.error("Failed to load orders:", err);
    }
  };

  return (
    <div>
      <DeliveryHeader />
      <h1>My Order List</h1>

      {myOrders.length > 0 ? (
        myOrders.map((order, index) => (
          <div key={index} className="order-card">
            <h3>Name: {order.name || "N/A"}</h3>
            <p><strong>Amount:</strong> Rs. {order.amount}</p>
            <p><strong>Address:</strong> {order.address || "N/A"}</p>
            <p><strong>Status:</strong> {order.status || "Pending"}</p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}

      <RestaurantFooter />
    </div>
  );
}
