"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/customerHeader";
import RestaurantFooter from "./_components/restrauntFooter";
import { useRouter } from "next/navigation";

export default function Page() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [restraunt,setRestraunt] = useState([])
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestraunt();
  }, []);
const loadRestraunt = async (params) => {
  let url = "http://localhost:3000/api/customer";

  if (params?.location) {
    url += `?location=${params.location}`;
  } else if (params?.restraunt) {
    url += `?restraunt=${params.restraunt}`;
  }

  let response = await fetch(url);
  response = await response.json();

  if (response.success) {
    setRestraunt(response.result);
  }
};

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/location");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };

  const handleSelect = (city) => {
    setSelectedLocation(city);
    setShowDropdown(false);
    loadRestraunt({location:city})
  };

  return (
    <main>
      <CustomerHeader />
      <div className="home-wrapper">
        <img
          className="background-img"
          src="https://png.pngtree.com/thumb_back/fh260/background/20230204/pngtree-burger-fire-food-hd-background-image_1541161.jpg"
          alt="background"
        />
        <div className="overlay-content">
          <h1>Food Delivery App</h1>
          <div className="search-fields">
            <input
              type="text"
              value={selectedLocation}
              placeholder="Select Place"
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
            {
                showDropdown&&   (
                <ul className="dropdown-list">
                  {
                 locations.map((item, index) => (
                      <li key={index} onClick={() => handleSelect(item)}>
                        {item}
                      </li>
                    ))
                  }
                </ul>
              )
            }
            <input type="text" onChange={(e)=>loadRestraunt({restraunt:e.target.value})} placeholder="Enter restaurant name" />
          </div>
        </div>
      </div>

      <div className="load-data">
       
        {
          restraunt.map((item)=>{
       return     <div key={item.id} onClick={() => router.push(`explor/${item.name}/?id=${item._id}`)} className="load-content">
            <div className="name">
                <h1>{  item.name}</h1>
            </div>
            <div className="city">
                <h3>{item.city}</h3>
            </div>
             <div className="email">
                <h5><strong>Email:</strong> { item.email}</h5>
            </div>
          <div className="address">
               <h5><strong>Address:</strong> {item.address}</h5>
           </div>
          <div className="contact">
                <h5><strong>Contact:</strong> { item.contact}</h5>
             </div>
                </div>
           })
        }
      </div>
      <RestaurantFooter />
    </main>
  );
}
