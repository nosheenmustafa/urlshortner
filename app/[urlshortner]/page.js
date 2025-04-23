
import {redirect} from 'next/navigation'
import connectDB from '../../lib/mongodb'
import Url from '../../models/url'
export default async function Page({ params }) {
  const shorturl = (await params).urlshortner;
  await connectDB();
  const doc = await Url.findOne({prefurl:shorturl});
  if(doc){
    doc.clicks +=1;
    doc.clickHistory.push({timestamp: Date.now()});
    await doc.save();
     return  redirect(doc.url);
  } else{
    return redirect(`${process.env.NEXT_PUBLIC_HOST}`);
  }

  // console.log("params data is here", shorturl);

  return (
    <div>
      <p>Post: {params.urlshortner}</p>
    </div>
  );
}
