import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/orderModel";
import { RestaurantModel } from "@/app/lib/restrauntModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  let id = params.id;
  let success = false;
  await mongoose.connect(connectionStr);

  let orders = await orderSchema.find({ deliveryBoy_id: id });

  if (orders && orders.length > 0) {
    let foodieData = await Promise.all(
      orders.map(async (order) => {
        let foodie = await RestaurantModel.findById(order.foodie_id); // ✅ FIXED here

        return {
          name: foodie?.name || "N/A",
          address: foodie?.address || "N/A",
          amount: order.amount,
          status: order.status,
        };
      })
    );

    success = true;
    return NextResponse.json({ result: foodieData, success });
  }

  return NextResponse.json({ result: [], success });
}
