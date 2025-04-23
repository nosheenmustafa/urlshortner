"use client";
import React, { useState, useRouter } from "react";
import QRCodeBox from "@/app/Qrcode/page";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
// import Edit from '../Edit/page'
const Shorten = () => {
  const [form, setForm] = useState({ url: "", prefurl: "" });
  const [generated, setGenerated] = useState("");
  const [urls, setUrls] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) return;
    const gettheData = async () => {
      try {
        const request = await fetch(
          `api/shorten?username=${session.user.name}`
        );
        const res = await request.json();
        console.log("result here", res);
        setUrls(res.urls);
      } catch (error) {
        console.log("error in the data fetching");
      }
    };
    gettheData();
  }, [session]);

  if (!session) {
    console.log("please login first to generate your short url");
  }
  // console.log("session is here",session);
  // console.log("username",session.user.name);
  // console.log("proilfe ic", session.user.image)
  //hanld genrerate
  const hanldleGenerate = async () => {
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form: {
            url: form.url,
            prefurl: form.prefurl,
          },
          user: {
            name: session.user.name,
            profilepic: session.user.image,
          },
        }),
      });
      if (response) {
        alert("data saved without any error");
        const res = await response.json();
        console.log("res goes here", res);
        setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${form.prefurl}`);
        setUrls((prev) => [res.result, ...prev]);
        setForm({ url: "", prefurl: "" });
      }
    } catch (error) {
      alert("there is error in this code");
    }
  };

  //hanlde delete logic here
  const handleDelete = async (id) => {
    const request = await fetch(`/api/getSingleurl?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (request) {
      setUrls((prev) => prev.filter((url) => url._id !== id));
    }
  };
  return (
    <div>
      <div className="mx-auto w-[40%] bg-purple-300 mt-16 rounded-md text-black font-bold">
        <h1 className="font-bold text-center pt-4 text-white text-2xl underline underline-offset-2">
          Generate your url shortner
        </h1>
        <div className="flex flex-col p-4 my-3">
          <input
            type="text"
            name="url"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="Enter url here "
            className=" bg-white px-2 py-1 rounded-lg my-2 font-bold focus:outline-2 focus:outline-purple-500 "
          />
          <input
            type="text"
            name="prefurl"
            value={form.prefurl}
            onChange={(e) => setForm({ ...form, prefurl: e.target.value })}
            placeholder="Enter your preffered url shortner text "
            className="bg-white px-2 py-1 my-2  rounded-lg font-bold focus:outline-2 focus:outline-purple-500"
          />
          <button
            className="bg-purple-700 px-2 py-1 rounded-lg text-white font-bold my-3 disabled:opacity-50"
            onClick={hanldleGenerate}
            disabled={!session}
          >
            Generate
          </button>

          {generated && (
            <div>
              Your link:{" "}
              <Link target="_blank" href={generated}>
                {generated}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto  font-bold px-32 text-black">
        {urls.length > 0 && (
          <div className="mt-4">
            <h1 className="font-bold  text-center  text-3xl">
              welcome {session?.user?.name}
            </h1>

            <h2 className=" font-bold mb-2">Your Previous Links:</h2>
            <ul className=" list-disc pl-5">
              {urls.map((url, idx) => (
                <li
                  key={idx}
                  className="flex gap-2 w-full my-12 text-center items-center "
                >
                  <Link
                    href={process.env.NEXT_PUBLIC_HOST + "/" + url.prefurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-80"
                  >
                    {process.env.NEXT_PUBLIC_HOST + "/" + url.prefurl}
                  </Link>
                  <span>visited count: {url.clicks}</span>
                  <div className="flex justify-self-end m-0 mt-4  mr-4  ">
                    <QRCodeBox
                      url={`${process.env.NEXT_PUBLIC_HOST}/${url.prefurl}`}
                    />
                  </div>
                  <span className="flex gap-8">
                    <Link href={`Edit/${url._id}`}>
                      {" "}
                      <button className="bg-purple-300 px-2 py-1 rounded-lg text-white hover:cursor-pointer">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-purple-300 px-2 py-1 rounded-lg text-white hover:cursor-pointer"
                      onClick={() => handleDelete(url._id)}
                    >
                      Delete{" "}
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shorten;
