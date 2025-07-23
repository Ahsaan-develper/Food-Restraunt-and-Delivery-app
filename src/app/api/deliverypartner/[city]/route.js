import { connectionStr } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/deliveryPartner";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET (req ,{params}){
    let city = params.city;
    let success = false ;
    await mongoose.connect(connectionStr);
    let filter ={city:{$regex:new RegExp(city,"i")}};
    let result = await deliveryPartnerSchema.find(filter);
    if (result){
        success= true;
    }
    return NextResponse.json({result, success})
}