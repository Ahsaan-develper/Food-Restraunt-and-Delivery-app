import { connectionStr } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/deliveryPartner";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST (req){
let payload = await req.json();
let success = false;
await mongoose.connect(connectionStr);
let result = await deliveryPartnerSchema.find({phone:payload.phone,password:payload.password});
if (result){
    success = true;
}
return NextResponse.json({result,success});
}