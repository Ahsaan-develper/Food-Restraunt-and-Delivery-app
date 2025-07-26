"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/customerHeader";
import RestaurantFooter from "../_components/restrauntFooter";
import "./order.css";
import { Delivery_Charges, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

export default function Cartpage() {
  const [customerData, setCustomerData] = useState(null);
  const [cartStorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  // ✅ Load localStorage data on client
  useEffect(() => {
    const customer = localStorage.getItem("customer");
    const cart = localStorage.getItem("cart");

    if (customer) {
      setCustomerData(JSON.parse(customer));
    }
    if (cart) {
      const parsedCart = JSON.parse(cart);
      setCartStorage(parsedCart);

      let t = 0;
      parsedCart.forEach((item) => {
        t += parseFloat(item.price);
      });
      setTotal(t);
    }
  }, []);

  const handleAddorder = async () => {
    if (!customerData || cartStorage.length === 0) return;

    const city = customerData.city;
    const user_id = customerData._id;
    const foodItemsId = cartStorage.map((item) => item._id).toString();
    const foodie_id = cartStorage[0].foodie_id;

    let deliveryBoy = await fetch(`http://localhost:3000/api/deliverypartner/${city}`);
    deliveryBoy = await deliveryBoy.json();
    const deliveryBoy_ids = deliveryBoy.result.map((item) => item._id);
    const deliveryBoy_id = deliveryBoy_ids[Math.floor(Math.random() * deliveryBoy_ids.length)];

    if (!deliveryBoy_id) {
      alert("Delivery boy not available");
      return;
    }

    const collection = {
      user_id,
      foodItemsId,
      foodie_id,
      deliveryBoy_id,
      status: "Confirm",
      amount: total + Delivery_Charges + (TAX * total) / 100,
    };

    let response = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      body: JSON.stringify(collection),
    });

    response = await response.json();
    if (response.success) {
      alert("Order added");
      localStorage.removeItem("cart");
      router.push("/myprofile");
    } else {
      alert("Order failed");
    }
  };

  if (!customerData) return <div>Loading...</div>;

  return (
    <div>
      <CustomerHeader />
      <div className="wrapper">
        <div className="summary">
          <div><h1>Customer details</h1></div>
          <div className="charge-items"><span>Name:</span><span>{customerData.name}</span></div>
          <div className="charge-items"><span>City:</span><span>{customerData.city}</span></div>
          <div className="charge-items"><span>Address:</span><span>{customerData.address}</span></div>
          <div className="charge-items"><span>Phone NO.:</span><span>{customerData.phone}</span></div>

          <div><h1>Order details</h1></div>
          <div className="charge-items"><span>Food Charges:</span><span>Rs. {total}</span></div>
          <div className="charge-items"><span>Tax:</span><span>Rs. {(TAX * total) / 100}</span></div>
          <div className="charge-items"><span>Total Delivery Charges:</span><span>Rs. {Delivery_Charges}</span></div>
          <div className="charge-items total"><span>Total Amount:</span><span>Rs. {total + Delivery_Charges + (TAX * total) / 100}</span></div>

          <div><h1>Delivery details</h1></div>
          <div className="charge-items total"><span>Cash on Delivery:</span><span>Rs. {total + Delivery_Charges + (TAX * total) / 100}</span></div>

          <button onClick={handleAddorder}>Place your order Now</button>
        </div>
      </div>
      <RestaurantFooter />
    </div>
  );
}
