
'use client'
import React from "react";
import Link from 'next/link';
import {useSession, signIn, signOut} from 'next-auth/react';

const Navbar = () => {
  const {data:session} = useSession();
  
  return (
    <nav className="h-16 bg-purple-700 py-4">
    <div className=" flex justify-between px-4 text-white">
      <div className="font-bold text-2xl">
         <Link href="/">Logo</Link>
      </div>
      <ul className="flex gap-4">
        <Link href="/">
          {" "}
          <li>Home</li>
        </Link>
        <Link href="/about">
          <li>About</li>
        </Link>
        <Link href="/contact">
          <li>Contact us</li>
        </Link>
        {/* <Link href="Shorten">
          <li>Shorten</li>
        </Link> */}
      <Link href="/login"><button className="bg-purple-500 shadow-lg rounded-lg px-2 py-1" > Login</button></Link>
      <button onClick={()=>signOut({callbackUrl: '/'})}>Logout</button>
        <li className="flex gap-4">
          {/* <Link href="/Shorten"><button className="bg-purple-500 shadow-lg rounded-lg px-2 py-1" >Try now</button></Link> */}
          <Link href="/github"><button className="bg-purple-500 shadow-lg rounded-lg px-2 py-1">Github</button></Link>
        </li>
      </ul>
    </div>
    </nav>
  );
};

export default Navbar;
