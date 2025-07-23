"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import './update.css'
import { Long_Cang } from "next/font/google";
export default function EditFoodItem(props) {
    
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [descr, setDescr] = useState("");
  const [error , seterror]= useState(false);
  const router = useRouter()
useEffect(() => {
    handleFoodLoad();
  }, []);
  const handleFoodLoad=async()=>{
    let response= await fetch("http://localhost:3000/api/restraunt/foods/edit/"+props.params.id);
     let data= await response.json()
    if (data.success){
    setName(data.result.name)
    setPrice(data.result.price)
    setImage(data.result.img_Path)
    setDescr(data.result.description)
    }
  }
  const handleFoodEdit =async () => {
    let restrauntData = localStorage.getItem("restrauntUser")
      if (!name || !price || !image || !descr ){
        seterror(true)
      }else{
        seterror(false)
      }
    
    let response= await fetch("http://localhost:3000/api/restraunt/foods/edit/"+props.params.id,{
      method:"Put",
      body:JSON.stringify({name,price,img_Path:image,description:descr})
    });
    response = await response.json();
    if (response.success){
      router.push("../dashboard")
    }else{
      alert("Data is not updated please try again")
    }
  };

  return (
    <div className="page-container">
      <div className="food-form">
        <h1>Update Food Item</h1>
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
       <div className="button-row">
        <button className="btn red" onClick={handleFoodEdit}>Update Food Item</button>
        <button className="btn black" onClick={() => router.push("../dashboard")}>Back to food item list</button>
        </div>



      </div>
    </div>
  );
}
