import React, { useState } from "react";
import axios from "axios";
export default function StoreAddProduct({ email }) {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const [message, setMessage] = useState("");
  const [myProductStock, setMyProductStock] = useState([]);
  const [mySales, setMySales] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: "http://localhost:3001/add_product",
      params: {
        email: email,
        productName: productName,
        productCategory: productCategory,
        productPrice: productPrice,
        productStock: productStock,
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleMyProductStock = () => {
    const options = {
      method: "GET",
      url: "http://localhost:3001/my_product_stock",
      params: {
        email: email,
      },
    };
    axios
      .request(options)
      .then((response) => {
        setMyProductStock(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleMySales = () => {
    const options = {
      method: "GET",
      url: "http://localhost:3001/my_sales",
      params: {
        email: email,
      },
    };
    axios
      .request(options)
      .then((response) => {
        setMySales(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-white mt-2 mb-2">Add Products</h1>
      <form
        className="flex justify-center items-start flex-col border-2 rounded-xl p-5 text-white"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h3>{message}</h3>
        <div className="flex justify-center items-start mt-2 flex-col">
          <label>Product Name:</label>
          <input
            className="focus:border-blue-500 bg-transparent text-white border-2 rounded-xl mt- pr-2 pl-2"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center items-start mt-2 flex-col">
          <label>Product Category:</label>
          <input
            className="focus:border-blue-500 bg-transparent text-white border-2 rounded-xl mt- pr-2 pl-2"
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center items-start mt-2 flex-col">
          <label>Product Price:</label>
          <input
            className="focus:border-blue-500 bg-transparent text-white border-2 rounded-xl mt- pr-2 pl-2"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center items-start mt-2 flex-col">
          <label>Product Stock:</label>
          <input
            className="focus:border-blue-500 bg-transparent text-white border-2 rounded-xl mt- pr-2 pl-2"
            type="number"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center items-center w-full mt-4">
          <button
            className="hover:bg-slate-600 w-28  border-2 rounded-xl"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
      <hr className="text-white w-full mt-5 mb-5"></hr>
      <div className="w-full flex justify-center items-center flex-col">
        <button
          className="hover:bg-slate-600 w-52 text-white  border-2 rounded-xl mb-5"
          onClick={() => handleMyProductStock()}
        >
          My Product Stocks
        </button>
        <div className="flex justify-center items-center">
          {myProductStock &&
            myProductStock.map((s) => (
              <div
                className="border-2 p-2 m-2 rounded-xl text-white"
                key={Math.random()}
              >
                <h4>Product Name: {s.product_name}</h4>
                <h4>Product Category: {s.product_category}</h4>
                <h4>Product Price: {s.product_price}</h4>
                <h4>Product Left: {s.product_stock}</h4>
              </div>
            ))}
        </div>
        <hr className="text-white w-full mt-5 mb-5"></hr>
        <div className="flex justify-center items-center flex-col">
          <button
            className="hover:bg-slate-600 w-52 text-white  border-2 rounded-xl mb-5"
            onClick={() => handleMySales()}
          >
            My Sales
          </button>
          <div className="flex justify-center items-center">
            {mySales &&
              mySales.map((m) => (
                <div
                  className="border-2 p-2 m-2 rounded-xl text-white"
                  key={Math.random()}
                >
                  <h4>Customer ID: {m.c_id}</h4>
                  <h4>Payment Method: {m.payment_method}</h4>
                  <h4>Receipt ID: {m.receipt_id}</h4>
                  <h4>Total Price: {m.total_price}</h4>
                  <h4>Transcation ID: {m.transcation_id}</h4>
                </div>
              ))}
          </div>
        </div>
      </div>
      <hr className="text-white w-full mt-5 mb-5"></hr>
    </div>
  );
}
