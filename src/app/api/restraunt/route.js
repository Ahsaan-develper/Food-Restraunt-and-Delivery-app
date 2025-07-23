import { connectionStr } from "@/app/lib/db";
import { RestaurantModel } from "@/app/lib/restrauntModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr);
  const data = await RestaurantModel.find();
  return NextResponse.json({ result: data });
}
export async function POST(req) {
  let payLoad = await req.json();
  await mongoose.connect(connectionStr);
  let res;
  let success = false;

  if (payLoad.login) {
    // ✅ Check both email and password
    res = await RestaurantModel.findOne({
      email: payLoad.email,
      password: payLoad.password
    });

    if (res) {
      success = true;
    }
  } else {
    // ✅ Register new restaurant
    let restraunt = new RestaurantModel(payLoad);
    res = await restraunt.save();

    if (res) {
      success = true;
    }
  }

  // ✅ Only return success if a match or save was successful
  return NextResponse.json({ result: res, success }, { status: 200 });
}

