'use client';
import { useEffect, useState } from 'react';
import './style.css';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const RestrauntHeader = () => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const path = usePathname();

 useEffect(() => {
  const data = localStorage.getItem("restrauntUser");

  if (!data  && path === "/restraunt/dashboard") {
    router.push("/restraunt");
  } else if (data && path === "/restraunt") {
    router.push("/restraunt/dashboard");
  }

  if (data) {
    try {
      setDetails(JSON.parse(data));
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
    }
  }
}, []);


  const logout = () => {
    localStorage.removeItem("restrauntUser");
    router.push("/restraunt");
  };

  return (
    <header className="header">
      <img
        src="https://img.pikbest.com/png-images/20241030/culinary-restaurant-logo-design_11027332.png!bw700"
        alt="Restaurant Logo"
      />
      <ul className="nav-menu">
        <li><Link href="/">Home</Link></li>

        {details && details.name ? (
          <>
            <li><button onClick={logout}>Logout</button></li>
            <li><Link href="/restraunt">Profile</Link></li>
          </>
        ) : (
          <>
            <li><Link href="/restraunt">Login</Link></li>
            <li><Link href="/restraunt">Sign Up</Link></li>
          </>
        )}
      </ul>
    </header>
  );
};

export default RestrauntHeader;
