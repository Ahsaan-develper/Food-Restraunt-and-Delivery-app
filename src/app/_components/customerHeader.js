"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CustomerHeader(props) {
  const router = useRouter();
  const [storage, setStorage] = useState(null);
  const [cartItem, setCartItem] = useState([]);
  const [cartNumber, setCartNumber] = useState(0);

  useEffect(() => {
    // ✅ Runs only on client
    const customerData = localStorage.getItem("customer");
    setStorage(customerData);

    try {
      const raw = localStorage.getItem("cart");
      if (raw) {
        const parsedCart = JSON.parse(raw);
        setCartItem(parsedCart);
        setCartNumber(parsedCart.length);
      }
    } catch (e) {
      console.error("Invalid cart JSON in localStorage:", e);
      localStorage.removeItem("cart");
    }
  }, []);

  useEffect(() => {
    if (props.cart) {
      setCartItem((prevCart) => {
        if (prevCart.length > 0 && prevCart[0].foodie_id !== props.cart.foodie_id) {
          const newCart = [props.cart];
          setCartNumber(1);
          localStorage.setItem("cart", JSON.stringify(newCart));
          return newCart;
        } else {
          const newCart = [...prevCart, props.cart];
          setCartNumber(newCart.length);
          localStorage.setItem("cart", JSON.stringify(newCart));
          return newCart;
        }
      });
    }
  }, [props.cart]);

  useEffect(() => {
    if (props.removeCartItem) {
      const updatedCart = cartItem.filter(item => item._id !== props.removeCartItem);
      setCartItem(updatedCart);
      setCartNumber(updatedCart.length);
      if (updatedCart.length === 0) {
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    }
  }, [props.removeCartItem]);

  const logout = () => {
    localStorage.removeItem("customer");
    router.push("/user_auth");
  };

  return (
    <div className="customer-header">
      <img
        src="https://img.pikbest.com/png-images/20241030/culinary-restaurant-logo-design_11027332.png!bw700"
        alt="Restaurant Logo"
      />
      <ul>
        <Link className="no-underline" href="/"><li>Home</li></Link>
        {storage ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link className="no-underline" href="/user_auth"><li>Login</li></Link>
            <Link className="no-underline" href="/user_auth"><li>Sign Up</li></Link>
          </>
        )}
        <Link className="no-underline" href={cartNumber ? "/cart" : "#"}> <li>Cart ({cartNumber})</li></Link>
        <Link className="no-underline" href="/restraunt"><li>Add Restraunt</li></Link>
        <Link className="no-underline" href="/deliverypartner"><li>Delivery Partner</li></Link>
      </ul>
    </div>
  );
}
