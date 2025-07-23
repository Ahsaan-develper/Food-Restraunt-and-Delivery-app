import { NextResponse } from "next/server";
import { AddItemModel } from "@/app/lib/foodAddModel";
import mongoose, { mongo } from "mongoose";
import { connectionStr } from "@/app/lib/db";
export  async function POST(req) {
    let payLoad = await req.json();
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    let food = new AddItemModel(payLoad);
    let foodData = await food.save()
    return NextResponse.json({result:foodData,success:true},{status:200})
}