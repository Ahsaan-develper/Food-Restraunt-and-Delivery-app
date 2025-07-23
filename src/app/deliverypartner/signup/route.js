import { connectionStr } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/deliveryPartner";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST (req){
let payload = await req.json();
let success = false;
await mongoose.connect(connectionStr);
let data = new deliveryPartnerSchema(payload);
let result = await data.save();
if (result){
    success = true;
}
return NextResponse.json({result,success});
}