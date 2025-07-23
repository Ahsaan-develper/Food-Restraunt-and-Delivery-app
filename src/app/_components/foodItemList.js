"use client";
import { useEffect, useState } from "react";
import "./showFoods.css";
import { useRouter } from "next/navigation";

export default function FoodItemList() {
  const router = useRouter()
  const [foodItem, setFoodItem] = useState([]);

  useEffect(() => {  
    loadData();
  }, []);
const loadData = async () => {
      const user = JSON.parse(localStorage.getItem("restrauntUser"));
      const id = user._id;

      const res = await fetch(`http://localhost:3000/api/restraunt/foods/${id}`);
      const data = await res.json();
      if (data?.result) setFoodItem(data.result);
    };

  const deleteData =async(id)=>{
      let response = await fetch (`http://localhost:3000/api/restraunt/foods/${id}`,{
        method: "Delete"
      })
      response= await response.json();
      if (response.success){
        loadData()
      }else{
        alert("Food item not delete")
      }
  }
  return (
    <div className="table-container">
      <h1>Food Items List</h1>
      <table className="food-table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodItem.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <img src={item.img_Path} alt={item.name} className="food-img" />
              </td>
              <td>{item.description}</td>
              <td>
                <button onClick={()=>router.push(`/restraunt/dashboard/${item._id}`)} className="edit-btn">Edit</button>
                <button onClick={()=>deleteData(item._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
         
        </tbody>
      </table>
    </div>
  );
}
