

import { connectionStr } from "@/app/lib/db";
import { AddItemModel } from "@/app/lib/foodAddModel";
import { RestaurantModel } from "@/app/lib/restrauntModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET (req,{params}){
    let id = params.id;
    await mongoose.connect(connectionStr);
    let restarutnData= await RestaurantModel.find({_id:id});
    let foodData = await AddItemModel.find({foodie_id:id});
    return NextResponse.json({result : restarutnData,foodData , success : true},{status:200})
}