const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "vickyroot",
  database: "crud_application",
});

app.get("/hello", (req, res) => {
  var searchValue = req.query;
  console.log(searchValue.name);
  const sqlremove = "select * from  students WHERE FirstName LIKE ?";
  db.query(sqlremove, [`${searchValue.name}%`], (error, result) => {
    if (error) {
      console.log(error);
    }
    console.log(result)
    res.send(result)
  });
  
});

app.get("/", (req, res) => {
  const sqlget = "SELECT * FROM students";
  db.query(sqlget, (error, result) => {
    res.send(result);
  });
});

//insert data
app.post("/post", (req, res) => {
  const { FirstName, LastName, Location, Email, Dob, Education } = req.body;
  const sqlinsert =
    "INSERT INTO students(FirstName, LastName, Location, Email, Dob, Education) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sqlinsert,
    [FirstName, LastName, Location, Email, Dob, Education],
    (error, result) => {
      if (error) {
        console.log(error);
      }
    }
  );
});

app.delete("/remove/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sqlremove = "DELETE FROM students WHERE ID = ?";
  db.query(sqlremove, [id], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sqlget = "SELECT * FROM students where ID = ?";
  db.query(sqlget, [id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.post("/update", (req, res) => {
  const { FirstName, LastName, Location, Email, Dob, Education, id } = req.body;
  const sqlput =
    "UPDATE students SET FirstName = ?,LastName = ? ,Location = ? , Email = ?, Dob = ?, Education = ?  WHERE ID = ?";
  db.query(
    sqlput,
    [FirstName, LastName, Location, Email, Dob, Education, id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

app.listen(3030, () => {
  console.log("3030 Server is Running...");
});
