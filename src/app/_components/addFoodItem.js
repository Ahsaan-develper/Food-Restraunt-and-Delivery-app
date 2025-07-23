import { useState } from "react";
import './foodadd.css';
import './style.css'
import { useRouter } from "next/navigation";

export default function AddFoodItem(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [descr, setDescr] = useState("");
  const [error , seterror]= useState(false);
  const router = useRouter();
  const handleFoodAdd =async () => {
    let foodie_id;
    const restrauntData = localStorage.getItem("restrauntUser");
    if (restrauntData){
      if (!name || !price || !image || !descr ){
        seterror(true)
      }else{
        seterror(false)
      }

      let parsed = JSON.parse(restrauntData)
       foodie_id = parsed._id;
       
    }
    let response = await fetch("http://localhost:3000/api/restraunt/foods",{
      method:"Post",
      body:JSON.stringify({name,price,img_Path:image,description:descr,foodie_id})
    });
      response = await response.json();
      if (response.success){
        router.push("/restraunt/dashboard")
        props.setAddItem(false)
      }else{
        alert("Items Not added");
      }
  };

  return (
    <div className="page-container">
      <div className="food-form">
        <h1>Add Food Item</h1>
        <input type="text" placeholder="Enter food name" value={name} onChange={(e) => setName(e.target.value)} />
        {
          error  && !name &&<span className="error-text" >Enter food name</span>
        }
        <input type="text" placeholder="Enter food price" value={price} onChange={(e) => setPrice(e.target.value)} />
          {
          error  && !price &&<span className="error-text" >Enter food price</span>
        }
        <input type="text" placeholder="Enter food image URL" value={image} onChange={(e) => setImage(e.target.value)} />
          {
          error  && !image &&<span className="error-text" >Enter food image</span>
        }
        <input type="text" placeholder="Enter food description" value={descr} onChange={(e) => setDescr(e.target.value)} />
          {
          error  && !descr &&<span className="error-text" >Enter food description</span>
        }
        <button onClick={handleFoodAdd}>Add Food</button>
      </div>
    </div>
  );
}
