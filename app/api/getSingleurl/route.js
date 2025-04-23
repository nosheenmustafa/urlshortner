// Get the data based on specific URL so that we can update it later
import { NextResponse } from 'next/server';
import Url from '@/models/url';
import connectDB from '@/lib/mongodb';

export async function GET(request) {
  await connectDB();
  
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  // console.log(`id on the server side: ${id}`);
  
  try {
    const data = await Url.findById(id);
    if (!data) {
      return NextResponse.json({
        success: false,
        message: "No data found for the given ID."
      });
    }

    return NextResponse.json({
      success: true,
      message: "Data for the given ID was found.",
      data
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while fetching the data.",
      error: error.message
    });
  }
}


//update request for the spesific id is here
export async function PUT(request){
  await connectDB();
   const {searchParams} = new URL(request.url);
   const id = searchParams.get("id")?.trim();
   const data = await request.json();
  //  console.log(`formname for update ${data.url} `);
  //  console.log(`form prefurl ${data.prefurl}`);
  //  console.log(`id for the update request is here ${id}`);
   const updaterecord = await Url.findByIdAndUpdate(id,{
    url:data.url,
    prefurl:data.prefurl
   },{new:true});
   try{
    if(!updaterecord){
    return NextResponse.json({success:false, message:"update failed"})
   }
   return NextResponse.json({success:true, message:"Url updated successfully", data:data});
  
   }catch(error){
       return NextResponse.json({success:false, message:"update failed check again", error:error.message});
   }
}

//delete by using id
export async function DELETE(request){
  await connectDB();
 const {searchParams} = new URL(request.url);
   const id = searchParams.get("id")?.trim();
  console.log(`delete id is here ${id}`);
   const findiddb =  await Url.findByIdAndDelete(id);
   if(!findiddb){
    return NextResponse.json({success:false, message:"no id found to delete that url"});
   }
    return NextResponse.json({success:ture, message:"record deleted successfully"});


}