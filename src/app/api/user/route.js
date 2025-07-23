// ✅ FILE: app/api/user/route.js
import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { usersSchema } from "@/app/lib/usersModel";

export async function POST(req) {

    let payload = await req.json();
let success = false;
    await mongoose.connect(connectionStr);

    const newUser = new usersSchema(payload);
    const data = await newUser.save();
if (data ){
    success= true
}
    return NextResponse.json({result:data , success})
  } 