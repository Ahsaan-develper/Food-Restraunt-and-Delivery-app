"use client";
import { useState } from "react";
import CustomerHeader from "../_components/customerHeader";
import RestaurantFooter from "../_components/restrauntFooter";
import User from "../_components/userSignUp";
import UserLogin from "../_components/userLogin";
import "../_components/User.css"; // ✅ Import the CSS file

export default function UserAuth(props) {
  const [login, setLogin] = useState(true);
  console.log(props);
  return (
    <div className="auth-wrapper">
      <CustomerHeader />
      <div className="auth-box">
        {login ? <UserLogin redirect={props.searchParams} /> : <User  redirect={props.searchParams}/>}
        <button
          className="auth-toggle-btn"
          onClick={() => setLogin(!login)}
        >
          {login
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>
      </div>
      <RestaurantFooter />
    </div>
  );
}
