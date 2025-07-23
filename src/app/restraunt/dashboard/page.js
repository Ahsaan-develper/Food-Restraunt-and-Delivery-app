"use client";
import RestrauntHeader from "@/app/_components/restrauntHeader";
import "../../_components/style.css";
import "./dashboard.css"
import AddFoodItem from "@/app/_components/addFoodItem";
import { useState } from "react";
import FoodItemList from "@/app/_components/foodItemList";
export default function Dashboard() {
  const [addItem, setAddItem] = useState(false);
  return (
    <div>
      <RestrauntHeader />
      <div className="dashboard-buttons">
        <button onClick={() => setAddItem(true)}>Add Food Items</button>
        <button onClick={() => setAddItem(false)}>Dashboard</button>
      </div>
      {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
    </div>
  );
}
