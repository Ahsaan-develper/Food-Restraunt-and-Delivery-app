import { connectionStr } from "@/app/lib/db";
import { AddItemModel } from "@/app/lib/foodAddModel";
import mongoose, { connect } from "mongoose";
import { NextResponse } from "next/server";
export async function GET(req,{params}) {
    let id = params.id;
    let success = false;
    console.log(id);
    
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    const foodData = await AddItemModel.find({foodie_id:id}) ;
    if (foodData){
        success= true;
    }
    return NextResponse.json({result:foodData,success})
}
export async function DELETE(req,{params}) {
    let id = params.id;
    let success = false;
    await connect(connectionStr);
    let response = await AddItemModel.deleteOne({_id:id});
    if (response.deletedCount>0){
        success= true;
    }else{
        success=false;
    }
    return NextResponse.json({result :response , success});
}