const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();

// app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "001",
      name: "Joe",
      email: "joe@gmail.com",
      password: "ball",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "002",
      name: "Jane",
      email: "jane@gmail.com",
      password: "fries",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "joe@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  //   res.send("This is working!");
  res.send(database.users);
});
app.post("/signin", (req, res) => {
  // Load hash from your password DB.
  bcrypt.compare(
    "spider",
    "$2a$10$ngfGXZuu/6fYxbz7n9JEkOzcr3NjRG5Eqr5h.jxOAG6o/vZEP/WR2",
    function (err, res) {
      console.log("first guess", res);
    }
  );
  bcrypt.compare(
    "veggies",
    "$2a$10$ngfGXZuu/6fYxbz7n9JEkOzcr3NjRG5Eqr5h.jxOAG6o/vZEP/WR2",
    function (err, res) {
      console.log("second guess", res);
    }
  );

  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    
     res.json(database.users[0]);
  } else {
    res.status(400).json("Error logging in!");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, null, null, (err, hash) => {
    // Store hash in your password DB.
    console.log(hash);
  });

  database.users.push({
    id: "003",
    name,
    email,
    password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("Not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("Not found!");
  }
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
