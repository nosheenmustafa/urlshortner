// TryNowButton.jsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function Trynow() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleClick = () => {
    
      if (session) {
        router.push("/Shorten");
      } else {
        router.push("/login");
      }
   
  }

  return (
    <button
      onClick={handleClick}
      className="bg-purple-500 shadow-lg rounded-lg px-2 py-1"
    >
      Try now
    </button>
  );
}
