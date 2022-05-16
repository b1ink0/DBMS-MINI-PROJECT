import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LogIn({ setLogIn, store, setStore, email, setEmail }) {
  const [signUp, setSignUp] = useState(true);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: "http://localhost:3001/customer",
      params: {
        email: email,
        password: password,
        name: name,
        address: address,
        store: store,
        signUp: signUp,
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setLogIn(response.data.flag);
        setMessage(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex justify-center items-center">
        <button
          className="hover:bg-slate-600 border-2 rounded-xl text-white p-1 w-44 mr-2"
          onClick={() => setStore(false)}
        >
          Customer
        </button>
        <button
          className="hover:bg-slate-600 border-2 rounded-xl text-white p-1 w-44 ml-2"
          onClick={() => setStore(true)}
        >
          Grocery Store
        </button>
      </div>
      <div className="flex justify-center items-center mt-5">
        <button
          className="hover:bg-slate-600 border-2 rounded-xl text-white p-1 w-44 mr-2"
          onClick={() => setSignUp(false)}
        >
          Log In
        </button>
        <button
          className="hover:bg-slate-600 border-2 rounded-xl text-white p-1 w-44 ml-2"
          onClick={() => setSignUp(true)}
        >
          Sign Up
        </button>
      </div>
      <hr className="text-white w-full mt-5 mb-5"></hr>
      <div className="flex justify-center items-center mt-5 flex-col">
        <h1 className="text-white mb-2">
          {store ? "Grocery Store " : "Customer "}
          {signUp ? "Sign Up" : "Log In"}
        </h1>
        <h3 className="text-red-400">{message}</h3>
        <form
          className="flex justify-center items-start flex-col border-2 rounded-xl p-5 text-white"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex justify-center items-start mt-2 flex-col">
            <label>Email:</label>
            <input
              className="focus:border-blue-500 bg-transparent text-white border-2 rounded-xl mt- pr-2 pl-2"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>
          <div className="flex justify-center items-start mt-2 flex-col">
            <label>Password:</label>
            <input
              className="focus:border-blue-500 bg-transparent text-white border-2 rounded-xl mt- pr-2 pl-2"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              minLength="8"
            />
          </div>
          {signUp && (
            <>
              <div className="flex justify-center items-start mt-2 flex-col">
                <label> {store ? "Grocery Store " : "Customer "} Name:</label>
                <input
                  className="focus:border-blue-500 bg-transparent text-white border-2 rounded-xl mt- pr-2 pl-2"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                />
              </div>
              <div className="flex justify-center items-start mt-2 flex-col">
                <label>Address:</label>
                <input
                  className="focus:border-blue-500 bg-transparent text-white border-2 rounded-xl mt- pr-2 pl-2"
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  required
                />
              </div>
            </>
          )}
          <div className="flex justify-center items-center w-full mt-4">
            <button
              className="hover:bg-slate-600 w-28  border-2 rounded-xl"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
