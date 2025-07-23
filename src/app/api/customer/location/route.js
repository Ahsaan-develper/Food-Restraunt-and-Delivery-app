import { connectionStr } from "@/app/lib/db";
import { RestaurantModel } from "@/app/lib/restrauntModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    await mongoose.connect(connectionStr);
    let result =await RestaurantModel.find();
    result = result.map((item)=>item.city?.toLowerCase() );
    let data = [... new Set(result)]
    return NextResponse.json({result: data, success: true})
}