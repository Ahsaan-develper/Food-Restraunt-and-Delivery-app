import { connectionStr } from "@/app/lib/db";
import { RestaurantModel } from "@/app/lib/restrauntModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  let queryParams = req.nextUrl.searchParams;
  let filter = {};

  const city = queryParams.get("location");
  const name = queryParams.get("restraunt");

  if (city) {
    filter = { city: { $regex: new RegExp(city, "i") } };
  } else if (name) {
    filter = { name: { $regex: new RegExp(name, "i") } };
  } else {
    filter = {};
  }

  await mongoose.connect(connectionStr);
  const result = await RestaurantModel.find(filter);

  return NextResponse.json({ result, success: true });
}
