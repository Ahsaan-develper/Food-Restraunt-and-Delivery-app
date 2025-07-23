import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/orderModel";
import { RestaurantModel } from "@/app/lib/restrauntModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
let paylaod = await req.json();
let success = false;
await mongoose.connect(connectionStr)
let data = new orderSchema(paylaod);
let result = await data.save();
if (result){
    success = true;
}
return NextResponse.json({result,success});
}

export async function GET(req) {
    let userid = req.nextUrl.searchParams.get("id");
    let success = false;
    await mongoose.connect (connectionStr);
    let result = await orderSchema.find({user_id:userid})
    if (result){
        let foodieData = await Promise.all(
            result.map( async(item)=>{
                let foodieInfo ={};
                foodieInfo.data = await RestaurantModel.findOne({_id:item.foodie_id});
                foodieInfo.amount= item.amount;
                foodieInfo.status= item.status;
                return foodieInfo;
            })
        )
        result= foodieData;
        success = true;
    }
    return NextResponse.json({result,success})
}