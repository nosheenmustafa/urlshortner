'use client'
import React, {useState,useEffect} from 'react'
import {useSession} from 'next-auth/react' 
import  {useRouter}  from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';

const Editpage = ({id}) => {
    const [form, setForm] = useState({ url: "", prefurl: "" });
    const{data:session} = useSession();
    const router = useRouter();

// console.log(`url id is here ${id}`)
    //it will fll the form values relvent to their id
    useEffect(() => {
      const getdata = async() =>{
        try{
           const request  = await fetch(`/api/getSingleurl?id=${id}`);
           const response =await request.json();
           setForm(response.data);
           console.log("request data is",response);
      }
      catch(error){
        console.log("error in fetching the data based on specific id");
      }
      }
      getdata();
    }, [id])
    
    //handle update
    const hanldleUpdate =async() =>{
      const respone = await fetch(`/api/getSingleurl?id= ${id}`,{
        method: "PUT",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({...form})
      })
      if(respone){
          toast("Your data updated successfully");
          router.push('/Shorten');
      }
    }
  
  return (
    <div>
       <div className="mx-auto w-[40%] bg-purple-300 mt-16 rounded-md text-black font-bold">
      <h1 className="font-bold text-center pt-4 text-white text-2xl underline underline-offset-2">
        Edit your url
      </h1>
      <div className="flex flex-col p-4 my-3">
        <input
          type="text"
          name="url"
          value={form.url}
          onChange={(e)=>setForm({...form , url:e.target.value})}
          placeholder="Enter url here "
          className=" bg-white px-2 py-1 rounded-lg my-2 font-bold focus:outline-2 focus:outline-purple-500 "
        />
        <input
          type="text"
          name="prefurl"
          value={form.prefurl}
          onChange={(e)=>setForm({...form, prefurl:e.target.value})}
          placeholder="Enter your preffered url shortner text "
          className="bg-white px-2 py-1 my-2  rounded-lg font-bold focus:outline-2 focus:outline-purple-500"
        />
       <button 
  className="bg-purple-700 px-2 py-1 rounded-lg text-white font-bold my-3 disabled:opacity-50" 
   onClick={hanldleUpdate}
  disabled={!session}
>
  Update
</button>
<ToastContainer />
</div>
    </div>
    </div>
  )
}

export default Editpage