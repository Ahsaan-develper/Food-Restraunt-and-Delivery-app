import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { AddItemModel } from "@/app/lib/foodAddModel";
import mongoose, { connect } from "mongoose";

export async function GET(req , {params}) {
    let id = params.id; 
    let success =  false;
  await mongoose.connect(connectionStr);
  const data = await AddItemModel.findOne({_id:id});
  if (data){
    success=true;
  }
  return NextResponse.json({ result: data,success });
}

export async function PUT(req, { params }) {
  const id = params.id;
  let success = false;

  const payload = await req.json();
  await mongoose.connect(connectionStr);

  const result = await AddItemModel.findByIdAndUpdate(id, payload)

  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}
