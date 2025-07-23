"use client";
import Link from "next/link";
export default function DeliveryHeader() {
 
  return (
    <div className="customer-header">
      <img
        src="https://img.pikbest.com/png-images/20241030/culinary-restaurant-logo-design_11027332.png!bw700"
        alt="Restaurant Logo"
      />
      <ul>
        <Link className="no-underline" href="/"><li>Home</li></Link>
      </ul>
    </div>
  );
}
