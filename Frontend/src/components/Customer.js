import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Customer({ email }) {
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState([]);
  const [currentStore, setCurrentStore] = useState({});
  const [temp, setTemp] = useState([]);
  const [receipt, setReceipt] = useState({});
  const handleShowStore = () => {
    const options = {
      method: "GET",
      url: "http://localhost:3001/stores",
    };
    axios
      .request(options)
      .then((response) => {
        setStores(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectedStore = (store_id) => {
    const options = {
      method: "GET",
      url: "http://localhost:3001/store",
      params: {
        store_id: store_id,
      },
    };
    axios
      .request(options)
      .then((response) => {
        stores.forEach((store) => {
          if (store.store_id === store_id) {
            setCurrentStore(store);
          }
        });
        setTemp([]);
        console.log("run");
        setStore(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToCart = (s) => {
    setTemp([...temp, s]);
  };
  useEffect(() => {
    console.log(temp);
  }, [temp]);
  const handleBuyNow = () => {
    let arr = [];
    let total = 0;
    temp.forEach((t) => {
      arr.push(t.product_id);
      total = total + t.product_price;
    });
    console.log(arr, total);
    const options = {
      method: "GET",
      url: "http://localhost:3001/buy",
      params: {
        email: email,
        cart: JSON.stringify(arr),
        total: total,
        store_id: currentStore.store_id,
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        let data = response.data;
        if (data.flag) {
          setTemp([]);
          setReceipt(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <button
        className="hover:bg-slate-600 border-2 rounded-xl text-white p-1 w-44 ml-2"
        onClick={() => handleShowStore()}
      >
        Show Grocery Stores
      </button>
      <h3 className="text-white mb-2 mt-2">Grocery Stores</h3>
      <div>
        {stores.length > 0 &&
          stores.map((store) => (
            <button
              className="hover:bg-slate-600 border-2 rounded-xl text-white p-1 ml-2"
              key={Math.random()}
              onClick={() => handleSelectedStore(store.store_id)}
            >
              <h4>Store Name: {store.store_name}</h4>
              <h4>Store Location: {store.store_address}</h4>
            </button>
          ))}
      </div>
      <hr className="text-white w-full mt-5 mb-5"></hr>
      <h3 className="text-white mb-2 mt-2">
        Selected Store: {currentStore && currentStore.store_name}
      </h3>
      <h3 className="text-white mb-2 mt-2">Available Products</h3>
      <div className="flex justify-center items-center">
        {store &&
          store.map((s) => (
            <div
              className="border-2 p-2 m-2 rounded-xl text-white"
              key={Math.random()}
            >
              <h4>Product Name: {s.product_name}</h4>
              <h4>Product Category: {s.product_category}</h4>
              <h4>Product Price: {s.product_price}</h4>
              <h4>Product Left: {s.product_stock}</h4>
              <button
                className="hover:bg-slate-600 border-2 rounded-xl text-white p-1 w-40 m-4"
                onClick={() => handleAddToCart(s)}
              >
                Add To Cart
              </button>
            </div>
          ))}
      </div>
      <hr className="text-white w-full mt-5 mb-5"></hr>
      <h3 className="text-white mb-2 mt-2">My Cart</h3>
      <div className="flex justify-center items-center flex-col">
        <ul className="flex justify-center items-center">
          {temp &&
            temp.map((c) => (
              <li
                className="border-2 p-2 m-2 rounded-xl text-white"
                key={Math.random()}
              >
                {c.product_name} : {c.product_price} RS
              </li>
            ))}
        </ul>
        <button
          className="hover:bg-slate-600 border-2 rounded-xl text-white p-1 w-40 m-4"
          onClick={() => handleBuyNow()}
        >
          Buy Now
        </button>
      </div>
      <hr className="text-white w-full mt-5 mb-5"></hr>
      <h3 className="text-white mb-2 mt-2">My Receipt</h3>
      <div className="border-2 p-2 m-2 rounded-xl text-white">
        {receipt && (
          <>
            <h5>Store ID: {receipt.store_id}</h5>
            <h5>Customer ID: {receipt.c_id}</h5>
            <h5>Receipt ID: {receipt.receipt_id}</h5>
            <h5>Transaction ID: {receipt.transaction_id}</h5>
            <h5>Total Cost: {receipt.total} RS</h5>
          </>
        )}
      </div>
      <hr className="text-white w-full mt-5 mb-5"></hr>
    </div>
  );
}
