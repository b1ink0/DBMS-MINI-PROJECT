import React from "react";
import { useEffect, useState } from "react";
import Customer from "./Customer";
import LogIn from "./LogIn";
import StoreAddProduct from "./StoreAddProduct";

export default function Dashboard() {
  const [logIn, setLogIn] = useState(false);
  const [store, setStore] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <>
      <hr className="text-white w-full mt-1 mb-5"></hr>

      <h1 className="w-full text-white text-center text-2xl mt-5 mb-5">
        Grocery Store
      </h1>
      <hr className="text-white w-full mt-5 mb-5"></hr>

      {logIn ? (
        store ? (
          <StoreAddProduct email={email} />
        ) : (
          <Customer email={email} />
        )
      ) : (
        <LogIn
          setLogIn={setLogIn}
          store={store}
          setStore={setStore}
          email={email}
          setEmail={setEmail}
        />
      )}
    </>
  );
}
