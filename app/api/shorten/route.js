
import { NextResponse } from "next/server";
import Url from '../../../models/url';
import User from '../../../models/User';

import connectDB from '../../../lib/mongodb';


export async function POST(request) {
  await connectDB();
  const { form, user } = await request.json();
  // console.log("session uesr name is here",user.name);
  // console.log("session img user", user.profilepic);

  //check if the user infor already saved then ignore it otherwise save it
  let userinfo = await User.findOne({name:user.name});
  if(!userinfo){
    userinfo = new User({
      name: user.name,
      profilepic: user.profilepic
    })
    await userinfo.save();
  }

  const alreadythere = await Url.findOne({prefurl:form.prefurl});
  if(alreadythere){
    return NextResponse.json({success:false, message:"this url already exists so try another"})
  //   const clicks =  alreadythere.clicks +=1;
  // const clickHistory = alreadythere.clickHistory.push({timestamp: Date.now()})
  }
  
  const newUrl = new Url({
    url: form.url,
    prefurl:form.prefurl,
    userId: userinfo._id,
    // clicks:clicks,
    // clickHistory:clickHistory
  
  });

  await newUrl.save();
  return NextResponse.json({ success: true, status: 200, result:newUrl });
}


//get all urls based on specific user id
export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  const user = await User.findOne({ name: username });
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "No user found with this name"
    });
  }

  const Urls = await Url.find({ userId: user._id });

  return NextResponse.json({
    success: true,
    message: "Data found successfully",
    urls: Urls
  });
}



