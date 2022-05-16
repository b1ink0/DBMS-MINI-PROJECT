var express = require("express");
var mysql = require("mysql2");
var cors = require("cors");

var db = mysql.createConnection({
  host: "localhost",
  user: "foo",
  password: "bar",
  database: "gs_db",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const app = express();

app.use(cors());
app.get("/connectdb", (req, res) => {
  let sql = "USE gs_db";

  db.query(sql, (err) => {
    if (err) throw err;
    res.send("connnected to database");
  });
});

app.get("/customer", (req, res) => {
  let sql;
  console.log(req.query.store);
  if (JSON.parse(req.query.store)) {
    sql = `select * from grocery_store where email="${req.query.email}"`;
  } else {
    sql = `select * from customer where email="${req.query.email}"`;
  }
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length === 0 && JSON.parse(req.query.signUp)) {
      if (JSON.parse(req.query.store)) {
        sql = `select count(store_id) as id from grocery_store`;
      } else {
        sql = `select count(c_id) as id from customer`;
      }
      query = db.query(sql, (err, results) => {
        if (err) throw err;
        if (JSON.parse(req.query.store)) {
          sql = `insert into grocery_store values(${results[0].id + 1},"${
            req.query.name
          }","${req.query.address}","${req.query.email}","${
            req.query.password
          }")`;
        } else {
          sql = `insert into customer values(${results[0].id + 1}, "${
            req.query.name
          }","${req.query.email}","${req.query.password}","${
            req.query.address
          }")`;
        }
        query = db.query(sql, (err, results) => {
          if (err) throw err;
          if (results) {
            res.send({ userCreated: true });
          }
        });
      });
    } else if (results.length !== 0 && !JSON.parse(req.query.signUp)) {
      if (JSON.parse(req.query.store)) {
        sql = `select * from grocery_store where email="${req.query.email}" and password="${req.query.password}"`;
      } else {
        sql = `select * from customer where email="${req.query.email}" and password="${req.query.password}"`;
      }
      query = db.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length !== 0) {
          res.send({ flag: true, message: "Logging In!" });
        } else {
          res.send({ flag: false, message: "Password Is Incorrect!" });
        }
        console.log(results.length !== 0);
      });
    } else {
      res.send({ userCreated: false, message: "User Alreay Exists!" });
    }
  });
});

app.get("/add_product", (req, res) => {
  let sql = `select store_id as id from grocery_store where email="${req.query.email}"`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    let id = results[0].id;
    sql = `select count(product_id) as count from stock`;
    query = db.query(sql, (err, results) => {
      if (err) throw err;
      sql = `insert into stock values(${results[0].count + 1}, "${
        req.query.productName
      }", ${req.query.productPrice}, "${req.query.productCategory}", ${
        req.query.productStock
      }, ${id})`;
      query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send({ message: "Product Added!" });
      });
    });
  });
});

app.get("/stores", (req, res) => {
  let sql = `select store_id, store_name, store_address from grocery_store`;

  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

app.get("/my_product_stock", (req, res) => {
  let sql = `select store_id as id from grocery_store where email="${req.query.email}"`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    let id = results[0].id;
    sql = `select * from stock where store_id=${id}`;
    query = db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
});

app.get("/my_sales", (req, res) => {
  let sql = `select store_id as id from grocery_store where email="${req.query.email}"`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    let id = results[0].id;
    sql = `select * from receipt where store_id=${id}`;
    query = db.query(sql, (err, results) => {
      if (err) throw err;
      console.log(results);
      res.send(results);
    });
  });
});

app.get("/store", (req, res) => {
  let sql = `select * from stock where store_id=${req.query.store_id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/buy", (req, res) => {
  let sql = `select * from customer where email="${req.query.email}"`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    let customer = results[0];
    console.log(results[0].c_id);
    JSON.parse(req.query.cart).forEach((c) => {
      sql = `update stock set product_stock=product_stock-1 where product_id=${c}`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
      });
    });
    sql = `select count(receipt_id) as count from receipt`;
    db.query(sql, (err, results) => {
      if (err) throw err;
      let t_id = Math.floor(Math.random() * 90000) + 10000;
      console.log();
      let count = results[0].count;
      sql = `insert into receipt values(${customer.c_id}, ${
        results[0].count + 1
      }, ${req.query.total}, "UPI", ${t_id}, ${req.query.store_id})`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        res.send({
          c_id: customer.c_id,
          payment_method: "UPI",
          receipt_id: count + 1,
          transaction_id: t_id,
          total: req.query.total,
          flag: true,
          store_id: req.query.store_id,
        });
      });
    });
  });
  // res.send({ message: "Ok" });
});

app.listen("3001", () => {
  console.log("Server Started On Port 3000!");
});
