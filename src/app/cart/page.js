"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/customerHeader";
import RestaurantFooter from "../_components/restrauntFooter";
import "./Cartpage.css";
import { Delivery_Charges, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

export default function Cartpage() {
  const [cartStorage, setCartStorage] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // ✅ new state
  const [total, setTotal] = useState(0);
  const router = useRouter();

  // ✅ Load cart from localStorage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartStorage(cartData);
    setIsLoaded(true); // ✅ mark as loaded
  }, []);

  // ✅ Recalculate total when cart changes
  useEffect(() => {
    let t = 0;
    cartStorage.forEach((item) => {
      t += parseFloat(item.price);
    });
    setTotal(t);
  }, [cartStorage]);

  // ✅ Redirect only after cart is loaded
  useEffect(() => {
    if (isLoaded && cartStorage.length === 0) {
      router.push("/");
    }
  }, [isLoaded, cartStorage]);

  const handleOrder = () => {
    const customer = JSON.parse(localStorage.getItem("customer"));
    if (customer) {
      router.push("/order");
    } else {
      router.push("/user_auth?order=true");
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cartStorage.filter((item) => item._id !== id);
    setCartStorage(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cartpage-wrapper">
      <CustomerHeader />
      <div className="cart-container">
        {cartStorage.length > 0 ? (
          cartStorage.map((item) => (
            <div key={item._id} className="cart-card">
              <img className="cart-image" src={item.img_Path} alt={item.name} />
              <div className="cart-info">
                <h3 className="cart-name">{item.name}</h3>
                <p className="cart-price">Rs. {item.price}</p>
                <p className="cart-desc">{item.description}</p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="cart-remove-btn"
                >
                  Remove from cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1 className="no-data-msg">No food items available</h1>
        )}
      </div>

      {/* ✅ Charges Section */}
      <div className="charges-summary">
        <div className="charge-item">
          <span>Food Charges:</span>
          <span>Rs. {total}</span>
        </div>
        <div className="charge-item">
          <span>Tax:</span>
          <span>Rs. {(TAX * total) / 100}</span>
        </div>
        <div className="charge-item">
          <span>Total Delivery Charges:</span>
          <span>Rs. {Delivery_Charges}</span>
        </div>
        <div className="charge-item total">
          <span>Total Amount:</span>
          <span>
            Rs. {total + Delivery_Charges + (TAX * total) / 100}
          </span>
        </div>
        <button onClick={handleOrder}>Order Now</button>
      </div>
      <RestaurantFooter />
    </div>
  );
}
