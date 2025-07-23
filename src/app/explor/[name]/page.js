"use client";
import { useEffect, useState } from "react";
import "./RestrauntExplore.css"; // Import CSS file
import CustomerHeader from "@/app/_components/customerHeader";
import RestaurantFooter from "@/app/_components/restrauntFooter";

export default function RestrauntExplore({ params, searchParams }) {
  let name = params.name;

  const [restruntDetails, setRestrauntDetails] = useState();
  const [foodDetails, setFoodDetails] = useState();
  const [cart,setCart]= useState();
  const [cartStorage,setCartStorage]= useState([])
  const [cartIds, setCartIds] =useState([])
  const [removeCartItem,setRemovecartItem]=useState()
       
useEffect(()=>{
  let localStorageData= JSON.parse(localStorage.getItem("cart"))||[];
  setCartIds(localStorageData.map((item)=>item._id)) 
},[])

  useEffect(() => {
    loadRestrauntDetails();
  }, []);
const addCart =(item)=>{
  setCart(item);
  let localCartIds = cartIds;
  localCartIds.push(item._id);
  setCartIds(localCartIds)
  setRemovecartItem()
}
const removeCartdata =(id)=>{
  setRemovecartItem(id);
  let localIds = cartIds.filter(item=> item!=id);
  setCart()
  setCartIds(localIds);
}
  const loadRestrauntDetails = async () => {
    try {
      const id = searchParams.id;
      let response = await fetch(`http://localhost:3000/api/customer/${id}`);
      response = await response.json();
      if (response?.success) {
        setRestrauntDetails(response.result??{});
        setFoodDetails(response.foodData??[]);
      } else {
        alert("Failed to load");
      }
    } catch (err) {
      alert("Error loading restaurant data");
      console.error(err);
    }
  };

  return (
    <div className="explore-wrapper">
      <CustomerHeader  cart={cart}  removeCartItem={removeCartItem}/>

      {/* Header Image with Overlay */}
      <div className="home-wrapper">
        <img
          className="background-img"
          src="https://png.pngtree.com/thumb_back/fh260/background/20230204/pngtree-burger-fire-food-hd-background-image_1541161.jpg"
          alt="background"
        />
        <div className="overlay-content">
          <h1>{name}</h1>
        </div>
      </div>

     {restruntDetails && restruntDetails.map((restraunt) => {
 return <div key={restraunt.id} className="restaurant-box">
    <h2>{restraunt.id}</h2>
    <p> {restraunt.name}</p>
    <p>{restraunt.city}</p>
    <p> {restraunt.address}</p>
    <p> {restraunt.contact}</p>
  </div>
     })
    }
 

<div className="food-container">
  {foodDetails && foodDetails.length > 0 ? (
    foodDetails.map((item) => (
      <div key={item.name} className="food-card">
        <img src={item.img_Path} alt={item.name} />
        <div className="food-info">
          <h3>{item.name}</h3>
          <p><strong>Price:</strong> Rs. {item.price}</p>
          <p>{item.description}</p>
          {
            cartIds.includes(item._id)?<button onClick={()=>removeCartdata(item._id)} className="cart-btn" >Remove from cart</button>:  <button className="cart-btn" onClick={()=>addCart(item)}>Add to cart</button>
          }
        
        </div>
      </div>
    ))
  ) : (
    <h1 className="no-data-msg">No food items available</h1>
  )}
</div>

 <RestaurantFooter />
    </div>
   
  );
}
