import React from "react";
import Editpage from "./Editpage";

export default async function Editparent({ params }) {
  const { id } = await params;
  //  console.log("url name i shere", name);
  return (
    <>
      <Editpage id={id} />
    </>
  );
}
